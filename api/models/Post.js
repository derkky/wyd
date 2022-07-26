import mongoose from "mongoose"

const schema = new mongoose.Schema({
    from: {type: String, required: true},
    nameLower: {type: String},
    body: {type: String, required: true},
    datetime: {type: Date, default: Date.now},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
})

schema.pre("save", function(next){
    this.nameLower = this.from.toLowerCase()
    next()
})

const Post = mongoose.model("Post", schema)

export default Post