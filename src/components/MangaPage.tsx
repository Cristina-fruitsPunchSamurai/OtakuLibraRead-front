
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {BASE_URL} from '../utils/API.js';
//MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function MangaPage() {
    const [mangaData, setMangaData] = useState([]);
    const {id} = useParams();

    //------ Requête à l'API ------//
    const fetchOneManga = async () => {
        try{
            const mangaResponse = await axios.get(`${BASE_URL}/manga/${id}`);
            setMangaData(mangaResponse.data);
        }catch(error) {
            console.log(error)
        }


    };

    useEffect(() => {
        fetchOneManga();

    }, []);

    return (
            <main className='mx-14'>
                <Card className="w-full md:flex ">
                    <CardMedia
                        sx={{ height: 540, width: 440 }}
                        image={mangaData.picture}
                        title="manga-image"

                    />

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {mangaData.title}
                            </Typography>

                            {mangaData.authors?.map((author) => (
                                <div key={author.id}>
                                    <Typography variant="body2" color="text.secondary">
                                    Author(s) : {author.firstname} {author.lastname}
                                    </Typography>
                                </div>
                            ))
                            }

                            <Typography variant="body2" color="text.secondary">
                            Description : {mangaData.description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Status : {mangaData.status}
                            </Typography>

                            {mangaData.tags?.map((tag) => (
                                <div key={tag.id}>
                                    <Typography variant="body2" color="text.secondary">
                                    {tag.name}
                                    </Typography>
                                </div>
                            ))
                            }
                        </CardContent>
                </Card>
            </main>
    )
}
