import mongoose from "mongoose"

const schema = new mongoose.Schema({
    postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    from: {type: String},
    body: {type: String, required: true},
    datetime: {type: Date, default: Date.now}
})


const Comment = mongoose.model("Comment", schema)

export default Comment