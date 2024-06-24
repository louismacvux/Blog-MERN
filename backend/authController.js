import axios from "axios";
import jwt from "jsonwebtoken";
import oauth2Client from "./oauth2client.js";
import User from "./db/UserSchema.js";
import dotenv from "dotenv";

dotenv.config();
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TIMEOUT,
  });
};
// Create and send Cookie ->
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  console.log(process.env.JWT_COOKIE_EXPIRES_IN);
  const cookieOptions = {
    expires: new Date(Date.now() +  Number(process.env.JWT_COOKIE_EXPIRES_IN)),
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    // secure: true,
  };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
    cookieOptions.sameSite = "none";
  }

  user.password = undefined;

  res.cookie("jwt", token, cookieOptions);

  console.log(user);

  res.status(statusCode).json({
    message: "success",
    token,
    data: {
      user,
    },
  });
};
/* GET Google Authentication API. */
const googleAuth = async (req, res, next) => {
  try {
    const code = req.query.code;
    console.log("USER CREDENTIAL -> ", code);

    const googleRes = await oauth2Client.getToken(code);
    
    oauth2Client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    let user = await User.findOne({ email: userRes.data.email });

    if (!user) {
      console.log("New User found");
      user = await User.create({
        name: userRes.data.name,
        email: userRes.data.email,
        image: userRes.data.picture,
      });
    }

    createSendToken(user, 201, res);
  }catch(err){
    next(err)
  }
};

export default googleAuth