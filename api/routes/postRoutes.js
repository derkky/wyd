import express from "express"
import { getPostsByName, createPost } from "../controllers/postControllers.js"

const router = express.Router()

router.get("/", getPostsByName)

router.post("/new", createPost)

export default router