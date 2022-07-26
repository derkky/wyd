import express from "express"
import mongoose from "mongoose"
import "dotenv/config" 
import helmet from "helmet"

import postRoutes from "./api/routes/postRoutes.js"
import commentRoutes from "./api/routes/commentRoutes.js"


mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(helmet())

app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)


app.listen(process.env.PORT, () => {
    console.log("Listening")
    //console.log(process.env.ACCESS_TOKEN)
})

