export const sessionChecker = (req, res, next) => {
  console.log(`Checking session: ${req.sessionID}`);
  if (req.session.user) {
    console.log(`Found User Session - Authorized`);
    res.locals.user = req.session.user;
    next();
  } else {
    console.log(`No User Session Found - Unauthorized`);
    res.status(404).send("No User Session Found - Unauthorized");
  }
};

export const parseCookies = (req, res, next) => {
  const {
    headers: { cookie },
  } = req;
  if (cookie) {
    const values = cookie.split(";").reduce((res, item) => {
      const data = item.trim().split("=");
      return { ...res, [data[0]]: data[1] };
    }, {});
    res.locals.cookie = values;
  } else res.locals.cookie = {};
  next();
};

const parseJWT = (token) => {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

export const logger = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  console.log(res.locals.cookie);
  if (res.locals.cookie.jwt) {
    res.locals.id = parseJWT(res.locals.cookie.jwt).id;
    next();
  } else {
    res.status(404).send("404 - Unauthorized");
  }
};

export const validateInput = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    console.log(req.body);
    return res.status(400).send("Updated note cannot be empty.");
  } else {
    next();
  }
};