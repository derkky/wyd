import { Typography, Stack, Card, CardContent, Paper, Box, CardHeader, TextField, Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: "#ddd"
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack spacing={2} marginX={5}>
        <Card
          sx={{
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
              alignItems: "center"
            }}
          >
            <Typography variant="h1">
              wyd.
            </Typography>
            <TextField
              multiline={true}
              sx={{ width: "300px" }}
              placeholder="I am..."
            />
            <Button variant="contained">Submit</Button>

          </CardContent>
        </Card>

        <Paper sx={{
          paddingX: "5em",
          paddingY: "1em"
        }}>
          <Typography variant="h4">
            What others are doing
          </Typography>
          <Box
            sx={{ display: "flex", marginTop: "2em" }}
          >
            <Card>
              <CardHeader title={"Test"} />
              <CardContent>
                lorem ipsum
              </CardContent>
            </Card>
          </Box>

        </Paper>

      </Stack>
    </ThemeProvider>

  );
}

export default App;
