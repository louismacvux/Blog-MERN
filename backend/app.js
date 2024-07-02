import express from "express"
import mongoose from 'mongoose'
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import feedRoute from './api/blog/feed.blog.js'
import postRoute from './api/blog/post.blog.js'
import AuthRoute from './api/auth.route.js'
import Logout from './api/logout.route.js'
import xss from 'xss';
import mongoSanitze from 'express-mongo-sanitize';

const app = express();

dotenv.config();
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
//app.use(mongoSanitze);
// app.use(xss);
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const connectDB = async () =>{
    try{
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.DB_URI,
          {
            useNewUrlParser: true,
          }
        );

        console.log('MongoDB is connected');

    } catch(err) {
        console.log(err.message);
        process.exit(1);
    }
}

connectDB();

const parseCookies = (req, res, next) => {
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
}

const parseJWT = (token)=> {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

const logger = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  console.log(res.locals.cookie);
  if (res.locals.cookie.jwt) {
    res.locals.id = parseJWT(res.locals.cookie.jwt);
    next();
  } else {
    res.status(404).send("404 - Unauthorized");
  }
};
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});


app.get("/header", (req, res) => res.send(req.headers)); //check set-cookie
app.get("/", (req, res) => res.send("Hello World!"));

app.use(parseCookies);
app.use(logger);

app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/auth/logout', Logout);
app.use('/feed',feedRoute);
app.use('/post', postRoute);

const port = process.env.PORT || 8008;

app.listen(port, () => console.log(`Server running on port ${port}`));

export default app