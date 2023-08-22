import path from 'path'
import express from "express"
import mongoose from 'mongoose'
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser";
const app = express();
import feedRoute from './api/feed.route.js'
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const connectDB = async () =>{
    try{
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
        });

        console.log('MongoDB is connected');

    } catch(err) {
        console.log(err.message);
        process.exit(1);
    }
}

connectDB();



app.get('/', (req,res) => res.send('Hello World!'));
app.use('/feed',feedRoute);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

export default app
