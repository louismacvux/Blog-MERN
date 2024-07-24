import express from "express"
import NoteModel from "../../db/NoteSchema.js"
import bodyParser from "body-parser";
import {validateInput} from '../../utils/middleware.js';
const router = express.Router()
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const findNote = async (req, res, next) => {
  let note;
  try {
    note = await NoteModel.findById(req.params.id);
    res.locals.note = note;
    next();
    console.log(note);
  } catch (err) {
    return res.status(500).send("Could not fetch note " + req.params.id);
  }
};

router.put("/:id", findNote, validateInput, async (req, res) => {
  let note = res.locals.note
  note.time = new Date();
  note.content = req.body.content;
  note.user_id = res.locals.user._id;
  try {
    await note.save();
    res.status(200).send("note patched");//.send("update: " + req.body.title + req.body.content);
  } catch (err) {
    res.status(400).send(`ERROR /note/${req.params.id} - ${err.message}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await NoteModel.findByIdAndDelete(req.params.id);
    res.status(200).send("note deleted");//send("delete: " + req.params.id);
  } catch (err) {
    res.status(400).send(`ERROR /note/${req.params.id} - ${err.message}`);
  }
});

router.post("/", validateInput, async (req, res) => {
  try {
    const note = await NoteModel.create({
      time: new Date(),
      content: req.body.content,
      user_id: res.locals.user._id,
    });
    res.status(200).json({noted_id:note._id});
  } catch (err) {
    res.status(400).send("ERROR /feed/note - " + err.message);
  }
});
export default router