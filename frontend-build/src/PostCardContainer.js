import { Typography, Paper, Box } from '@mui/material';
import PostCard from './PostCard';
import { useEffect } from "react"

const PostCardContainer = (props) => {
    useEffect(() => {
        const getPosts = async () => {
            const res = await fetch("http://localhost:8000/api/posts/?name=")
            const resJson = await res.json()

            if (!res.ok){
                console.log(resJson.msg)
            } else{
                props.setPosts(resJson.msg)
            }
        }

        getPosts()
    }, [])

    return (
        <Paper sx={{
            paddingX: { xs: "1em", sm: "2em", md: "5em" },
            paddingY: "1em"
        }}>
            <Typography variant="h6">
                What others are doing
            </Typography>
            <Box
                sx={{ display: "flex", marginTop: "2em", flexWrap: "wrap", justifyContent: { xs: "center", sm: "center", md: "space-between" }, gap: "1em" }}
            >
                {props.posts.map(pst => <PostCard key={pst._id} id={pst._id} name={pst.from} dt={pst.datetime} content={pst.content} comments={pst.comments}/>)}
                
            </Box>

        </Paper>
    )
}

export default PostCardContainer