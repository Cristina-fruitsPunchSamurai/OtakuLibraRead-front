
import React, { useState } from 'react';
import { Box } from "@mui/material";
import ButtonComponent from "../components/ButtonComponent";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import axios from 'axios';
import { BASE_URL } from '../utils/API';


type Status = 'ongoing' | 'completed' | 'dropped';

type NewMangaData = {
    title: string;
    status: Status;
    description: string;
    picture: string;
    author_lastname: string;
    author_firstname: string;
    tagIdArray: number[];
}

type Tags = {
    id: number;
    name: string;
}

const tags: Tags[] = [
        { id: 1, name: "Shonen" },
        { id: 2, name: "Seinen" },
        { id: 3, name: "Yaoi" },
        { id: 4, name: "Shojo" },
        { id: 5, name: "Josei" },
        { id: 6, name: "Omegaverse" },
        { id: 7, name: "Fantasy" },
        { id: 8, name: "Historical" }
]

export default function NewManga() {

    const [category, setCategory] = useState<number[]>([]);
    const [newMangaData, setNewMangaData] = useState<NewMangaData>({
    title: "",
    status: "ongoing",
    description: "",
    picture: "",
    author_firstname: "",
    author_lastname: "",
    tagIdArray: []
});

    const handleSelection = (
        event: React.MouseEvent<HTMLElement>,
        newSelection : any) => {

        if (newSelection == "ongoing" ||
            newSelection == "completed" ||
            newSelection == "dropped") {
            setNewMangaData({...newMangaData, status: newSelection});
        } else {
            setCategory(newSelection);
            setNewMangaData({...newMangaData, tagIdArray: newSelection});
        }
    }

    // const handleSelectionStatus = (
    //     event: React.MouseEvent<HTMLElement>,
    //     newStatus : Status) => {
    // setNewMangaData({...newMangaData, status: newStatus});
    // }

    // const handleSelectionCategory = (
    //     event: React.MouseEvent<HTMLElement>,
    //     newTags : number[]
    // ) => {
    //     setCategory(newTags);
    //     setNewMangaData((prevData) => ({
    //         ...prevData,
    //         tagIdArray: newTags
    //     }));
    // }

    const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} : {name:string, value:string} = event.target as HTMLInputElement;
        switch (name) {
            case 'title':
                setNewMangaData({...newMangaData, title: value});
                break;
            case 'description':
                setNewMangaData({...newMangaData, description: value});
                break;
            case 'picture':
                setNewMangaData({...newMangaData, picture: value});
                break;
            case 'author_lastname':
                setNewMangaData({...newMangaData, author_lastname: value});
                break;
            case 'author_firstname':
                setNewMangaData({...newMangaData, author_firstname: value});
                break;
            default:
                break;
        }
    }

    const postNewManga = async()=> {
    try {
        const result = await axios.post(`${BASE_URL}/manga`, newMangaData);
        setNewMangaData({
            title: "",
            status: "ongoing",
            description: "",
            picture: "",
            author_lastname: "",
            author_firstname: "",
            tagIdArray: []
        });
        console.log(result.data);
    }catch(error) {
        console.log(error)
    }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        postNewManga();
    }

  return (
    <section className="text-slate-900 pt-16">
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 relative">
                <div className="mb-4">
                    <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title">
                        Title
                    </label>
                    <input
                    className= "shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-cyber-purple"
                    id="title"
                    name="title"
                    type="text"
                    placeholder="title"
                    value={newMangaData.title}
                    onChange={handleValue}
                    />
                </div>
                <div className="mb-4">
                    <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="status">
                        Status
                    </label>
                    <ToggleButtonGroup
                        value={newMangaData.status}
                        exclusive
                        onChange={handleSelection}
                        aria-label="text alignment"
                        >
                        <ToggleButton value="ongoing" aria-label="left aligned">
                            Ongoing
                        </ToggleButton>
                        <ToggleButton value="completed" aria-label="centered">
                            Completed
                        </ToggleButton>
                        <ToggleButton value="dropped" aria-label="right aligned">
                            Dropped
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div className="mb-4">
                    <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description">
                        Description
                    </label>
                    <input
                    className= "shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-cyber-purple"
                    id="description"
                    name='description'
                    type="text"
                    placeholder="description"
                    value={newMangaData.description}
                    onChange={handleValue}
                    />
                </div>
                <div className="mb-4">
                    <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="image">
                        Image
                    </label>
                    <input
                    className= "shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-cyber-purple"
                    id="picture"
                    name='picture'
                    type="text"
                    placeholder="image"
                    value={newMangaData.picture}
                    onChange={handleValue}
                    />
                </div>
                <div className="mb-4">
                    <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="image">
                        Author's lastname
                    </label>
                    <input
                    className= "shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-cyber-purple"
                    id="author-lastname"
                    name='author_lastname'
                    type="text"
                    placeholder="author's lastname"
                    value={newMangaData.author_lastname}
                    onChange={handleValue}
                    />
                </div>
                <div className="mb-4">
                    <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="image">
                        Author's firstname*
                    </label>
                    <input
                    className= "shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-cyber-purple"
                    id="author-firstname"
                    name='author_firstname'
                    type="text"
                    placeholder="author's firstname"
                    value={newMangaData.author_firstname}
                    onChange={handleValue}
                    />
                </div>
                <div className="mb-4">
                    <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="status">
                        Tag
                    </label>
                    <ToggleButtonGroup
                        value={category}
                        onChange={handleSelection}
                        aria-label="tag"
                        >
                            {
                                tags.map((tag) => (
                                    <ToggleButton key={tag.id} value={tag.id} aria-label={tag.name}>
                                        {tag.name}
                                    </ToggleButton>
                                ))
                            }
                    </ToggleButtonGroup>
                </div>
            <Box className="my-5 flex justify-center items-center">
                <ButtonComponent text={'Enter'} color={'bg-cyber-purple'}/>
            </Box>
        </form>
    </section>
  )
}
