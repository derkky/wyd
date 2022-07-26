import Comment from "../models/Comment.js"
import Post from "../models/Post.js"


const getPostComments = async (req, res) => {
    const limit = 5
    // req.query.page
    try {
        const comments = await Comment.find({postId: req.params.postId})
            .sort({ "datetime": "desc" })
            .skip(req.query.page * limit)
            .limit(limit)

        res.status(200).json({ msg: comments })

    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

const createComment = async (req, res) => {
    const newComment = new Comment(
        req.body
    )

    const post = await Post.findById(req.body.postId)
    post.comments.push(newComment._id)

    try {
        await newComment.save()
        await post.save()

        res.status(200).json({ msg: "New comment created" })
    } catch (err) {
        res.status(500).json({ msg: err })
    }

}

export { getPostComments, createComment }