import { Typography, Card, CardContent, Box, TextField, Button, LinearProgress } from '@mui/material';
import { useState } from "react"

const TitleCard = (props) => {

    const [name, setName] = useState("")
    const [status, setStatus] = useState("")
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])

    const handlePost = async () => {
        setLoading(true)
        const newPost = {
            from: name == "" ? "Anonymous" : name,
            content: status
        }

        const res = await fetch("http://localhost:8000/api/posts/new", { //change in prd
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
        })

        const resJson = await res.json()

        if (!res.ok) {
            setErrors(resJson.msg)
        } else{
            props.setPosts(prev => [resJson.post, ...prev])
            setErrors([])
        }

        setLoading(false)
        props.setSnackbarOpen(true)
        props.setSnackbarMessage("Posted.")

    }

    return (
        <Card
            sx={{
                height: "400px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pb: "1.2em"
            }}
        >
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1em",
                    width: "100%",
                    alignItems: "center"
                }}
            >
                <Typography variant="h1">
                    wyd.
                </Typography>
                <TextField
                    multiline={true}
                    error={errors.length > 0}
                    label={errors.length > 0 ? "Error" : ""}
                    id="outlined-error-helper-text"
                    helperText={errors.includes("NO_CONTENT_ERROR") ? "Comment cannot be empty" : ""}
                    sx={{ width: "80%", maxWidth: "500px" }}
                    placeholder="I am..."
                    onChange={(e) => {
                        setStatus(e.target.value)
                    }}
                    rows={3}
                />
                <Box
                    sx={{ display: "flex", mb: "1em", width: "80%", maxWidth: "500px", justifyContent: "space-between" }}
                >
                    <TextField
                        placeholder="Name (Optional)"
                        sx={{ width: "60%" }}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                    <Button variant="contained" onClick={handlePost}>Post</Button>
                </Box>
                <Box sx={{ width: '100%' }}>
                    {loading ? <LinearProgress /> : null}
                </Box>

            </CardContent>
        </Card>
    )
}

export default TitleCard