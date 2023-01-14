import { Typography, Paper, Box } from '@mui/material';
import PostCard from './PostCard';

const PostCardContainer = (props) => {
    return (
        <Paper sx={{
            paddingX: { xs: "1em", sm: "2em", md: "5em" },
            paddingY: "1em"
        }}>
            <Typography variant="h6">
                What others are doing
            </Typography>
            <Box
                sx={{ display: "flex", marginTop: "2em", flexWrap: "wrap", justifyContent: { xs: "center", sm: "center", md: "space-between" } }}
            >
                <PostCard />
            </Box>

        </Paper>
    )
}

export default PostCardContainer