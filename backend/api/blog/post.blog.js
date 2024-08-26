import express from "express"
import PostModel from "../../db/PostSchema.js"
import bodyParser from "body-parser";
const router = express.Router()
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const findPost = async (req, res, next) => {
  let post
  try{
    post = await PostModel.findById(req.params.id)
    res.locals.post = post
    next()
    console.log(post)
  }catch (err){
    return res.status(500).send("Could not fetch post " + req.params.id)
  }
}

const validateInputPost = (req, res, next) => {
  if (Object.keys(req.body).length === 0){
    console.log(req.body);
    return res.status(400).send("Updated post cannot be empty.") 
  }
  else{
    next()
  }
}

router.get("/:id", findPost, (req, res) => {
    res.status(200).send(res.locals.post)
    console.log("OK 200")
})

router.patch("/:id", findPost, validateInputPost, async (req, res) => {
  let post = res.locals.post
  post.title = req.body.title;
  post.time = post.time;
  post.update_time = new Date();
  post.content = req.body.content;
  try {
    await post.save();
    res.status(200).send("OK");//.send("update: " + req.body.title + req.body.content);
  } catch (err) {
    res.status(400).send(`ERROR /post/${req.params.id} - ${err.message}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await PostModel.findByIdAndDelete(req.params.id);
    res.status(200).send("OK");//send("delete: " + req.params.id);
  } catch (err) {
    res.status(400).send(`ERROR /post/${req.params.id} - ${err.message}`);
  }
});

export default router