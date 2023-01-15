import mongoose from "mongoose"

const schema = new mongoose.Schema({
    postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    from: {type: String, default: "Anonymous", maxlength: [15, "MAX_CHARACTERS_ERROR"]},
    content: {type: String, required: [true, "NO_CONTENT_ERROR"], maxlength: [50, "MAX_CHARACTERS_ERROR"]},
    datetime: {type: Date, default: Date.now}
})


const Comment = mongoose.model("Comment", schema)

export default Comment