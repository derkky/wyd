import { Typography, Paper, Box, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PostCard from './PostCard';
import { useEffect, useState, useMemo } from "react"
import debounce from "lodash.debounce"

const SearchBar = (props) => {

    const handleSearch = async () => {
        const res = await fetch(`/api/posts/?name=${props.name}`)
        const resJson = await res.json()

        if (!res.ok) {
            console.log(resJson.msg)
            props.setPage(0)
        } else {
            props.setPosts(resJson.msg)
        }
    }


    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search by name"
                onChange={(e) => props.setName(e.target.value)}
            />
            <IconButton type="button" sx={{ p: '10px' }} onClick={handleSearch}>
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

const PostCardContainer = (props) => {

    const [name, setName] = useState("")


    useEffect(() => {
        const getPosts = async () => {
            const res = await fetch("/api/posts/?name=")
            const resJson = await res.json()

            if (!res.ok) {
                console.log(resJson.msg)
            } else {
                props.setPosts(resJson.msg)
            }
        }

        getPosts()
    }, [])

    const [page, setPage] = useState(0)


    const handleScroll = async () => {
        const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10
        if (bottom) {
            console.log("bottom")
            const postRes = await fetch(`/api/posts/?name=${name}&page=${Number(page) + 1}`)

            const resJson = await postRes.json()

            if (!postRes.ok) {
                console.log(resJson.msg)
            } else if (resJson.msg.length > 0) {
                props.setPosts(prev => [...prev, ...resJson.msg])
                setPage(resJson.page)
            }
        }
    }

    const debouncedHandleScroll = useMemo(() => debounce(handleScroll, 300), [page, name])

    useEffect(() => {
        window.addEventListener("scroll", debouncedHandleScroll)

        return () => window.removeEventListener("scroll", debouncedHandleScroll)
    }, [page, name])



    return (
        <Paper sx={{
            paddingX: { xs: "1em", sm: "2em", md: "5em" },
            paddingY: "1em"
        }}>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "nowrap",
                    gap: "1em"
                }}
            >
                <Typography variant="h6" sx={{ flex: 1, whiteSpace: "nowrap" }}>
                    What others are doing
                </Typography>
                <SearchBar setPosts={props.setPosts} setPage={props.setPage} name={name} setName={setName}/>
            </Box>

            <Box
                sx={{ display: "flex", marginTop: "2em", flexWrap: "wrap", justifyContent: { xs: "center", sm: "center", md: "space-between" }, gap: "1em" }}
                component="div"
            >
                {props.posts.map(pst =>
                    <PostCard
                        key={pst._id}
                        id={pst._id}
                        name={pst.from}
                        dt={pst.datetime}
                        content={pst.content}
                        comments={pst.comments}
                        setSnackbarOpen={props.setSnackbarOpen}
                        setSnackbarMessage={props.setSnackbarMessage}
                    />)}

            </Box>

        </Paper>
    )
}

export default PostCardContainer