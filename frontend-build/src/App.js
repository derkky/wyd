import {  Stack } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack spacing={2} marginX={5}>
        <TitleCard/>
        <PostCardContainer/>
      </Stack>
    </ThemeProvider>

  );
}

export default App;
