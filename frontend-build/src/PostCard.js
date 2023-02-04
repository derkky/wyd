import { Card, CardContent, CardHeader, List, ListItem, ListItemText, Divider, Typography, CardActions, Button, TextField, Box, LinearProgress } from '@mui/material';
import React, { useState, useEffect, useMemo } from "react"
import debounce from 'lodash.debounce';

const PostCard = (props) => {
    const [comment, setComment] = useState("")
    const [name, setName] = useState("")
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [page, setPage] = useState(0)

    const handleComment = async () => {
        setLoading(true)
        const newComment = {
            from: name == "" ? "Anonymous" : name,
            content: comment,
            postId: props.id // will be in props
        }

        const res = await fetch("/api/comments/new", {   //chg in prd
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newComment)
        }) //change in prd

        const resJson = await res.json()

        if (!res.ok) {
            setErrors(resJson.msg)
        } else {
            setComments(prev => [...prev, resJson.comment])
            setErrors([])
            props.setSnackbarOpen(true)
            props.setSnackbarMessage("Comment posted.")
        }

        setLoading(false)
    }

    const handleScroll = async (e) => {
        const bottom = e.target.scrollHeight - e.target.clientHeight <= e.target.scrollTop + 50;
        if (bottom) {
            console.log("bottom")
            const commentsRes = await fetch(`/api/comments/${props.id}?page=${page + 1}`)

            const resJson = await commentsRes.json()

            if (!commentsRes.ok) {
                console.log(resJson.msg)
            } else if (resJson.msg.length > 0){
                setComments(prev => [...prev, ...resJson.msg])
                setPage(resJson.page)  
            }
        }
    }

    const debouncedHandleScroll = useMemo(() => debounce(handleScroll, 300), [page])

    useEffect(() => {
        const fetchComments = async () => {
            const commentsRes = await fetch(`/api/comments/${props.id}`)

            const resJson = await commentsRes.json()

            if (!commentsRes.ok) {
                console.log(resJson.msg)
            }

            setComments(resJson.msg)
        }

        fetchComments()
    }, [])

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

                <div
                    onScroll={debouncedHandleScroll}
                    style={{ height: "150px", overflowY: "scroll" }}
                >
                    <List
                    >
                        {
                            comments.length == 0 ?
                                <Typography>No comments yet </Typography> :
                                comments.map(cmt => {
                                    return (
                                        <React.Fragment key={cmt._id}>
                                            <ListItem>
                                                <ListItemText
                                                    primary={<Typography sx={{ fontSize: "14px" }}> {cmt.from} </Typography>}
                                                    secondary={cmt.content}
                                                />
                                            </ListItem>
                                            <Divider variant="middle" component="li" />
                                        </React.Fragment>
                                    )
                                })
                        }
                    </List>
                </div>

            </CardContent>
            <CardActions
                sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Box
                    sx={{ display: "flex", flexDirection: "column", gap: "5px", width: "100%" }}
                >
                    <TextField
                        error={errors.length > 0}
                        label={errors.length > 0 ? "Error" : ""}
                        id="outlined-error-helper-text"
                        helperText={errors.includes("NO_CONTENT_ERROR") ? "Comment cannot be empty" : ""}
                        placeholder={"Add a comment"}
                        size={"small"}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Box
                        sx={{ display: "flex", justifyContent: "space-between" }}
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
                    <Box sx={{ width: '100%' }}>
                        {loading ? <LinearProgress /> : null}
                    </Box>
                </Box>

            </CardActions>
        </Card>
    )
}

export default PostCard