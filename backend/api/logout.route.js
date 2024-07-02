import jwt from "jsonwebtoken";
import User from "../db/UserSchema.js";
import dotenv from "dotenv";
dotenv.config();


const Logout = (req,res,next) => {
    jwt.verify(res.locals.cookie.jwt, process.env.JWT_SECRET, (error,success)=>{
        if (success) {
          const cookieOptions = {
            expires: new Date(Date.now()),
            httpOnly: true,
            path: "/",
          };
          res.cookie("jwt", ' ', cookieOptions);
          res.status(200).send();
          console.log("loggedout!");
        }
    });
}

export default Logout