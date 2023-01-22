import { Stack, Snackbar } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useMemo, useEffect } from "react"
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import PostCardContainer from './PostCardContainer';
import TitleCard from './TitleCard';
import debounce from "lodash.debounce"


let theme = createTheme({
  palette: {
    background: {
      default: "#ddd"
    }
  }
})

theme = responsiveFontSizes(theme)

function App() {
  const [posts, setPosts] = useState([])
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [page, setPage] = useState(0)


  const handleScroll = async () => {
    const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10
    console.log(page)
    if (bottom) {
      console.log("bottom")
      const postRes = await fetch(`http://localhost:8000/api/posts/?name=&page=${page + 1}`)

      const resJson = await postRes.json()

      if (!postRes.ok) {
        console.log(resJson.msg)
      } else if (resJson.msg.length > 0) {
        setPosts(prev => [...prev, ...resJson.msg])
        setPage(resJson.page)
      }
    }
  }

  const debouncedHandleScroll = useMemo(() => debounce(handleScroll, 300), [page])

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll)

    return () => window.removeEventListener("scroll", debouncedHandleScroll)
  }, [page])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack spacing={2} marginX={5} component="div" onScroll={debouncedHandleScroll}>
        <TitleCard setPosts={setPosts} setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} />
        <PostCardContainer posts={posts} setPosts={setPosts} setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} />
      </Stack>
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      />
    </ThemeProvider>

  );
}

export default App;
