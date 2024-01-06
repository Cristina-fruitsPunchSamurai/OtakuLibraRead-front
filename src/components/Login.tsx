
import { Container, Box, Typography, InputAdornment, IconButton, TextField} from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react"
import ButtonComponent from "./ButtonComponent";
import { Link } from "react-router-dom";
import {InputComponent} from "./Inputs/InputComponent";


export default function Login() {

    const [showPassword, setShowPassword] = useState(false);

    function myData(formData) {
        const query = formData.get("email");
        alert(`You searched for '${query}'`);
    }

    return (
        <main className="text-slate-900 pt-16">
            <Container
            maxWidth={'xs'}
            className="bg-cyber-white rounded w-[90%] mx-auto py-5">
                <Typography
                align="center"
                className="font-bold text-2xl mb-5">
                    Login
                </Typography>
                <form onSubmit={myData}>
                <Box
                className='bg-cyber-white flex flex-col text-base'>
                        <InputComponent
                        color={"secondary"}
                        type={"email"}
                        id={"email"}
                        placeholder={"xxx@email.com"}
                        name={"email"}
                        label={"Email"}/>
                        <TextField
                        color="secondary"
                        required
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        placeholder="your password*"
                        name="password"
                        autoFocus
                        autoComplete="password"
                        fullWidth
                        InputProps={{
                            endAdornment:
                            <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end">
                                {showPassword ? <Visibility/> : <VisibilityOff/> }
                            </IconButton>
                            </InputAdornment>
                        }}
                        />
                </Box>
                <Box className="my-5 flex justify-center items-center">
                    <ButtonComponent text={'Enter'} color={'bg-cyber-purple'}/>
                </Box>
                </form>
                <Link to='/signup'>
                <Typography
                align="left"
                className="text-xs mb-5 underline">
                    You don't have an account yet?
                </Typography>
                </Link>
            </Container>
        </main>
    )
}
