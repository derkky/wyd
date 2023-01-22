import Post from "../models/Post.js"

const getPostsByName = async (req, res) => {
    const limit = 10
    // req.query.page
    try {
        const queryName = req.query.name ?? ""
        const posts = await Post.find({
            "nameLower": { $regex: queryName, $options: "i" }
        })
            .sort({ "datetime": "desc" })
            .skip(req.query.page * limit)
            .limit(limit)
            .populate({path: "comments", options: {limit: 5}})

        res.status(200).json({ msg: posts, page: req.query.page ?? 0 })

    } catch (err) {
        const errorFields = Object.keys(err.errors)
        const errors = errorFields.map(errField => err.errors[errField].message)
        res.status(500).json({ msg: errors })
    }
}

const createPost = async (req, res) => {
    const newPost = new Post(
        req.body
    )

    try {
        await newPost.save()
        res.status(200).json({ msg: "New post created", post: newPost })
    } catch (err) {
        const errorFields = Object.keys(err.errors)
        const errors = errorFields.map(errField => err.errors[errField].message)
        res.status(500).json({ msg: errors })
    }

}


export { getPostsByName, createPost }