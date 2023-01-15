import { Card, CardContent, CardHeader, List, ListItem, ListItemText, Divider, Typography, CardActions, Button, TextField, Box } from '@mui/material';
import { useState, useEffect } from "react"

const PostCard = (props) => {
    const [comment, setComment] = useState("")
    const [name, setName] = useState("")
    const [comments, setComments] = useState([])

    const handleComment = async () => {
        const newComment = {
            from: name == "" ? "Anonymous" : name,
            content: comment,
            postId: props.id // will be in props
        }

        const res = await fetch("http://localhost:8000/api/comments/new", {   //chg in prd
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newComment)
        }) //change in prd

        const resJson = await res.json()

        if (!res.ok){
            console.log(resJson.msg)
        }

        setComments(prev => [...prev, resJson.msg.comment])

    }

    //useEffect() // fetch comments

    return (
        <Card
            sx={{
                width: "30%",
                minWidth: "290px"
            }}
        >
            <CardHeader title={props.name} subheader={props.dt} />
            <CardContent>
                <Typography
                    height={"80px"}
                >
                    {props.content}
                </Typography>
                <Typography
                    variant="h6"
                    mt="1em"
                >
                    Comments
                </Typography>

                <List
                    sx={{ height: "150px", overflowY: "scroll" }}
                >

                    <ListItem>
                        <ListItemText
                            primary={<Typography sx={{ fontSize: "14px" }}>Commenter name </Typography>}
                            secondary={"comment"}
                        />
                    </ListItem>
                    <Divider variant="middle" component="li" />
                </List>
            </CardContent>
            <CardActions
                sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Box
                    sx={{display: "flex", flexDirection:"column", gap: "5px", width: "100%"}}
                >
                    <TextField
                        placeholder={"Add a comment"}
                        size={"small"}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Box
                        sx={{display: "flex", justifyContent: "space-between"}}
                    >
                        <TextField
                            placeholder={"Name (Optional)"}
                            size={"small"}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Button onClick={handleComment}>
                            Comment
                        </Button>
                    </Box>
                </Box>


            </CardActions>
        </Card>
    )
}

export default PostCard