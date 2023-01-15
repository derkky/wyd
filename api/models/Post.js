import mongoose from "mongoose"

const schema = new mongoose.Schema({
    from: {type: String, required: true, maxlength: [15, "MAX_CHARACTERS_ERROR"]},
    nameLower: {type: String},
    content: {type: String, required: [true, "NO_CONTENT_ERROR"], maxlength: [50, "MAX_CHARACTERS_ERROR"]},
    datetime: {type: Date, default: Date.now},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
})

schema.pre("save", function(next){
    this.nameLower = this.from.toLowerCase()
    next()
})

const Post = mongoose.model("Post", schema)

export default Post