import express from "express"
import mongoose from "mongoose"
import "dotenv/config" 
import helmet from "helmet"
import path from "path"
import { fileURLToPath } from 'url';
import cors from "cors"

import postRoutes from "./api/routes/postRoutes.js"
import commentRoutes from "./api/routes/commentRoutes.js"


mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(helmet({
    crossOriginEmbedderPolicy: false
}))
app.use(cors())

app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)


// Client
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.resolve(__dirname, "./frontend-build/build")))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./frontend-build/build", "index.html"))
})

app.listen(process.env.PORT, () => {
    console.log("Listening")
    //console.log(process.env.ACCESS_TOKEN)
})

