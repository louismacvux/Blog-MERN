import express from "express"
import PostModel from "../db/PostSchema.js"
import bodyParser from "body-parser";
const router = express.Router()
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

router.get('/', async (req,res) => {
    const feed = await PostModel.find({})
    try{
        res.send(feed);
    }catch(err){
        res.status(404).send("Could not fetch feed");
    }

})

router.post('/post', async (req,res) => {
    try{
        const post = await PostModel.create({
            title: req.body.title,
            time: new Date(),
            content: req.body.content
        });
        res.send("posted: " + post);
    }catch(err){
        res.send("ERROR /feed/post - " + err.message);
    }
})
export default router