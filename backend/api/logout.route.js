import jwt from "jsonwebtoken";
import User from "../db/UserSchema.js";
import dotenv from "dotenv";
dotenv.config();


const Logout = (req,res,next) => {
    try{
      const user = req.session.user;
      if (user){
        req.session.destroy((err) => {
          if (err) throw (err);
          res.clearCookie(process.env.SESS_NAME, { sameSite: "none" });
          res.status(200).send(user);
        });
      }else{
        throw new Error('Logout went wrong')
      }
    }catch (err){
      res.status(422).send(err);
    }
}

export default Logout