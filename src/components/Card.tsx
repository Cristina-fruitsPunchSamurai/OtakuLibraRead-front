
import { Container, Grid, Box, Paper, Typography } from "@mui/material"

interface CardProps {
    title: string,
    authors: {
        firstname: string;
        lastname: string;
    }[];
    tags: {
        name: string;
    }[];
    status: string,
    image: string
}

export default function Card({title, authors, status, image, tags}: CardProps) {
    return (
            <Grid item xs={12} md={3}>
                <Box>
                    <Paper elevation={3} className="p-5 rounded-md h-[500px] ">
                            <img src={image} className="w-full h-[70%] object-cover"/>
                        <Box>
                            <Typography
                            className="font-bold text-slate-900 text-center text-lg">
                                {title}
                            </Typography>
                            <Typography
                            className="text-slate-900 text-left text-sm">
                                Author : {authors.map((author) => `${author.firstname} ${author.lastname}`).join(', ')}
                            </Typography>
                            <Typography
                            className="text-slate-900 text-left text-sm">
                                Tags : {tags.map((tag) => `${tag.name}`).join(', ')}
                            </Typography>
                            <Box className='flex justify-left items-center gap-3'>
                                <Typography
                                className="text-slate-900 text-sm">
                                    Status: {status}
                                </Typography>
                                <div className="w-3 h-3 rounded-full bg-green-500 inline-block"></div>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Grid>
    )
}
