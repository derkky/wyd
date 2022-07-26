import express from "express"
import { getPostComments, createComment } from "../controllers/commentController.js"

const router = express.Router()

router.get("/:postId", getPostComments)

router.post("/new", createComment)

export default router