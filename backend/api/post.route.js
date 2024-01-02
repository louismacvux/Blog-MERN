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

router.get("/:id", async (req, res) => {
    try{
        const post = await PostModel.findById(req.params.id);
        res.send(post)
    }catch(err){
        res.status(404).send("Could not fetch post " + req.params.id)
    }

})

router.patch("/:id", async (req, res) => {
  try {
    let post = await PostModel.findById(req.params.id);
    post.title = req.body.title;
    post.time = post.time;
    post.update_time = new Date();
    post.content = req.body.content;
    post.save();
    res.send("update: " + req.body.title);
  } catch (err) {
    res.send(`ERROR /post/${req.params.id} - ${err.message}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await PostModel.findByIdAndDelete(req.params.id);
    res.send("delete: " + req.params.id);
  } catch (err) {
    res.status(400).send(`ERROR /post/${req.params.id} - ${err.message}`);
  }
});

export default router