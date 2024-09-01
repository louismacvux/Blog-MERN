import axios from "axios";
import jwt from "jsonwebtoken";
import oauth2Client from "./oauth2client.js";
import User from "./db/UserSchema.js";
import dotenv from "dotenv";

dotenv.config();

/* GET Google Authentication API. */
const googleAuth = async (req, res, next) => {
  console.log("googleAuth")
  const userRes = {
    email: "testingemail@vercel.com",
    name: "vercel tester",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocItyATqfh5I7HHEbjRQWyHYTqGWheI09QDy-evq0S1_EJGJo8Xx=s96-c"
  };
  try {
    const code = req.query.code;
    console.log("USER CREDENTIAL -> ", code);

    const googleRes = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(googleRes.tokens);
    console.log(`googleRes ${googleRes}`);
    userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`,
      {
        timeout: 5000, // Set the timeout to 5000 milliseconds (5 seconds)
      }
    );
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      // This code indicates a timeout
      console.error("Request timed out:", error.message);
    } else {
      // Other errors
      console.error("An error occurred:", error.message);
    }
  }
  console.log(`userRes: ${JSON.stringify(userRes)}`);
  let user = await User.findOne({ email: userRes.email });
  
  if (!user) {
    console.log("New User found");
    user = await User.create({
      name: userRes.name,
      email: userRes.email,
      image: userRes.picture,
    });
  }

  req.session.user = user;

  res.send(req.session.user);
  console.log(`Session set: ${req.sessionID}`);
  console.log(req.session);
}; 

export default googleAuth