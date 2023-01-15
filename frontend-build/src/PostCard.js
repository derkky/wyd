import { Card, CardContent, CardHeader, List, ListItem, ListItemText, Divider, Typography, CardActions, Button, TextField, Box } from '@mui/material';


const PostCard = (src) => {
    return (
        <Card
            sx={{
                width: "30%",
                minWidth: "290px"
            }}
        >
            <CardHeader title={"Test"} subheader={"From: Poster name"} />
            <CardContent>
                <Typography
                    height={"80px"}
                >
                    lorem ipsum
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
                    />
                    <Box
                        sx={{display: "flex", justifyContent: "space-between"}}
                    >
                        <TextField
                            placeholder={"Name (Optional)"}
                            size={"small"}
                        />
                        <Button>
                            Comment
                        </Button>
                    </Box>
                </Box>


            </CardActions>
        </Card>
    )
}

export default PostCard