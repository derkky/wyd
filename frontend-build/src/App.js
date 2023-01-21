import {  Stack, Snackbar } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import {useState } from "react"
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import PostCardContainer from './PostCardContainer';
import TitleCard from './TitleCard';

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack spacing={2} marginX={5}>
        <TitleCard setPosts={setPosts} setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage}/>
        <PostCardContainer posts={posts} setPosts={setPosts} setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage}/>
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
