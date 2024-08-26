import mongoose, { trusted } from "mongoose";

const NoteSchema = new mongoose.Schema({
    time:{
        type: Date,
        required: true
    },
    content:{
        type:String,
        required: true
    },
    user_id:{
        type:String,
        required:true
    }
})

export default mongoose.model('note', NoteSchema)