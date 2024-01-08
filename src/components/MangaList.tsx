
import Card from "./Card";
import { Grid, Container } from "@mui/material";
import { useState, useEffect} from "react";
//import { LoginContext } from "../Contexts/LoginContext";
import axios from "axios";
import {BASE_URL} from "../utils/API.js";
import {Link} from "react-router-dom";

export default function MangaList() {
    const [mangaList, setMangaList] = useState([]);
   // const {isLogged}= useContext(LoginContext);
    //console.log('isLogged on mangalist',isLogged)

        const fetchMangaList = async() => {
        const result = await axios.get(`${BASE_URL}/mangas`);
        setMangaList(result.data)
    }

    useEffect(() => {
        fetchMangaList();
    }, [])

    return (
        <main className="pt-16">
            <Container
                maxWidth={'xl'} >
                <Grid container spacing={5}>
                {mangaList.length > 0 ?
                mangaList.map((manga) => (
                        <Card
                            link={manga.id}
                            key={manga.id}
                            title={manga.title}
                            authors={manga.authors}
                            tags={manga.tags}
                            status={manga.status}
                            image={manga.picture}
                        />
                )) : <h1>loading...</h1>}
                </Grid>
            </Container>
        </main>
    )
}
