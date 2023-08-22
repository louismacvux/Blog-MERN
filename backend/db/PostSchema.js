import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    time:{
        type: Date,
        required: true
    },
    update_time:{
        type: Date
    },
    content:{
        type: String,
        required: true,
    },
    picture:{
        type:String
    }
})

export default mongoose.model('post', PostSchema)