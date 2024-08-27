import axios from "axios";
import jwt from "jsonwebtoken";
import oauth2Client from "./oauth2client.js";
import User from "./db/UserSchema.js";
import dotenv from "dotenv";

dotenv.config();

/* GET Google Authentication API. */
const googleAuth = async (req, res, next) => {
  console.log("googleAuth")
  const userRes = {"something":"something"};
  try {
    const code = req.query.code;
    console.log("USER CREDENTIAL -> ", code);

    const googleRes = await oauth2Client.getToken(code);
    
    oauth2Client.setCredentials(googleRes.tokens);
    console.log(googleRes);
    userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    
  }catch(err){
    next(err)
  }
  console.log(`userRes: ${userRes}`);
  let user = await User.findOne({ email: userRes.data.email });
  
  if (!user) {
    console.log("New User found");
    user = await User.create({
      name: userRes.data.name,
      email: userRes.data.email,
      image: userRes.data.picture,
    });
  }

  req.session.user = user;

  res.send(req.session.user);
  console.log(`Session set: ${req.sessionID}`);
  console.log(req.session);
}; 

export default googleAuth