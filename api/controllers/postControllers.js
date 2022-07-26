import Post from "../models/Post.js"

const getPostsByName = async (req, res) => {
    const limit = 25
    // req.query.page
    try {
        const posts = await Post.find({
            "nameLower": { $regex: req.query.name, $options: "i" }
        })
            .sort({ "datetime": "desc" })
            .skip(req.query.page * limit)
            .limit(limit)
            .populate({path: "comments", options: {limit: 5}})

        res.status(200).json({ msg: posts })

    } catch (err) {
        res.status(500).json({ msg: err })
    }
}

const createPost = async (req, res) => {
    const newPost = new Post(
        req.body
    )

    try {
        await newPost.save()
        res.status(200).json({ msg: "New post created" })
    } catch (err) {
        res.status(500).json({ msg: err })
    }

}


export { getPostsByName, createPost }