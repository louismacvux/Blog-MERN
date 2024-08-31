import express from "express"
import NoteModel from "../../db/NoteSchema.js"
import bodyParser from "body-parser";
const router = express.Router()
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const validateInput = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send("note cannot be empty.");
  }
  next();
};

router.get('/', async (req,res) => {
    try{
        const feed = await NoteModel.find({ user_id: res.locals.user._id });
        res.send(feed.reverse());
    }catch(err){
        res.status(404).send(`Could not fetch notes - ${err}`);
    }

})

export default router