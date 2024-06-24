import express from "express"
import mongoose from 'mongoose'
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import feedRoute from './api/feed.route.js'
import postRoute from './api/post.route.js'
import AuthRoute from './api/auth.route.js'
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

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  if (req.cookies) console.log(req.cookies);
  console.log(req.headers)
  console.log(req.body)
  console.log(req.query)
  next();
});

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.get('/', (req,res) => res.send('Hello World!'));
app.use('/api/v1/auth', AuthRoute);
app.use('/feed',feedRoute);
app.use('/post', postRoute);

const port = process.env.PORT || 8008;

app.listen(port, () => console.log(`Server running on port ${port}`));

export default app
