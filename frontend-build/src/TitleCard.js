import { Typography, Card, CardContent, Box, TextField, Button } from '@mui/material';


const TitleCard = (props) => {

    return (
        <Card
            sx={{
                height: "300px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pb: "2em"
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
                    sx={{ width: "80%", maxWidth: "500px"}}
                    placeholder="I am..."
                    rows={3}
                />
                <Box
                    sx={{ display: "flex", mb: "1em", width: "80%", maxWidth: "500px", justifyContent: "space-between" }}
                >
                    <TextField
                        placeholder="Name (Optional)"
                        sx={{width: "60%"}}
                    />
                    <Button variant="contained">Submit</Button>

                </Box>

            </CardContent>
        </Card>
    )
}

export default TitleCard