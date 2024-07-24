import express from "express"
import mongoose from 'mongoose'
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import feedRoute from './api/blog/feed.blog.js';
import postRoute from './api/blog/post.blog.js';
import noteRoute from './api/note/post.note.js';
import allNotesRoute from './api/note/feed.note.js';
import AuthRoute from './api/auth.route.js';
import Logout from './api/logout.route.js';
import {sessionChecker, logger, parseCookies} from './utils/middleware.js';
import xss from 'xss';
import mongoSanitze from 'express-mongo-sanitize';

dotenv.config();

const app = express();

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

app.use(session({
  name: process.env.SESS_NAME,
  secret: process.env.SESS_SECRET,
  saveUninitialized: false,
  resave:false,
  rolling: true,
  store: MongoStore.create({
    mongoUrl : process.env.DB_URI,
    collectionName: 'session'
  }),
  cookie: {
    sameSite: true, 
    secure: false, //NODE_ENV === 'production'
    maxAge: parseInt(60)*1000 //10 mins
  }
}));


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

//Middlewares
app.use(parseCookies);

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

//Public Routes
app.get("/api/v1/session/get", (req, res) => {
  const user = { username: "Lon", user_id: 123456 };
  req.session.user = user;
  res.send(req.session);
  console.log("session set");
});

app.get("/api/v1/header", sessionChecker, (req, res) => {
  console.log(req.session.user);
  console.log(req.sessionID);
  res.status(200).send(req.session);
}); //check set-cookie

app.use("/api/v1/auth/login", AuthRoute);

app.use(sessionChecker);
//Protected Routes
app.get("/api/v1/session/destroy", (req,res) => {
  req.session.destroy((err) => {
    if (err) throw (err)
    res.clearCookie(process.env.SESS_NAME);
    res.status(200).send("Session destroyed")
  });
})

app.use('/api/v1/auth/logout', Logout);

app.use('/api/v1/note', noteRoute);
app.use('/api/v1/notes', allNotesRoute);
app.use('/feed',feedRoute);
app.use('/post', postRoute);

const port = process.env.PORT || 8008;

app.listen(port, () => console.log(`Server running on port ${port}`));

export default app