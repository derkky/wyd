import {  Stack } from '@mui/material';
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack spacing={2} marginX={5}>
        <TitleCard setPosts={setPosts}/>
        <PostCardContainer posts={posts} setPosts={setPosts}/>
      </Stack>
    </ThemeProvider>

  );
}

export default App;
