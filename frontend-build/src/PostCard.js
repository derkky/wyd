import { Card, CardContent, CardHeader, List, ListItem, ListItemText, Divider, Typography, CardActions, Button, TextField } from '@mui/material';


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
                            primary={<Typography sx={{fontSize: "14px"}}>Commenter name </Typography>}
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
                <TextField
                    placeholder={"Add a comment"}
                />
                <Button>
                    Add comment
                </Button>
            </CardActions>
        </Card>
    )
}

export default PostCard