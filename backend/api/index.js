import express from "express"
import mongoose from 'mongoose'
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import feedRoute from './blog/feed.blog.js';
import postRoute from './blog/post.blog.js';
import noteRoute from './note/post.note.js';
import allNotesRoute from './note/feed.note.js';
import AuthRoute from './auth.route.js';
import Logout from './logout.route.js';
import {sessionChecker, logger, parseCookies} from '../utils/middleware.js';
import xss from 'xss';
import mongoSanitze from 'express-mongo-sanitize';

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: "https://notebinder.vercel.app",
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
    sameSite: false, 
    secure: true, //NODE_ENV === 'production'
    maxAge: parseInt(process.env.SESS_EXPIRES)*1000 //86400
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
app.get("/hello", (req,res) => {
  res.status(200).send("hello world")
});

app.use(parseCookies);

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

//Public Routes
app.get("/api/v1/header", sessionChecker, (req, res) => {
  console.log(req.session.user);
  console.log(req.sessionID);
  res.status(200).send(req.session);
}); //check set-cookie

app.use("/api/v1/auth/login", AuthRoute);


//Protected Routes
app.use(sessionChecker);
app.get("/api/v1/auth/refresh", (req, res) => {
  res.status(200).send("OK");
});
app.get("/api/v1/user", (req,res)=>{
res.status(200).send(res.locals.user);  
})
app.use('/api/v1/auth/logout', Logout);

app.use('/api/v1/note', noteRoute);
app.use('/api/v1/notes', allNotesRoute);
app.use('/feed',feedRoute);
app.use('/post', postRoute);

const port = process.env.PORT || 8008;

app.listen(port, () => console.log(`Server running on port ${port}`));

export default app
