
import { Container, Box, Typography, FormHelperText, TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {InputComponent} from "./Inputs/InputComponent";
import { useState } from "react";
import ButtonComponent from "./ButtonComponent";
import {useForm, Controller} from "react-hook-form";


interface FormInput {
    firstname: string,
    lastname: string,
    email: string,
    password: string
}

export default function Signup() {
    //*----------------- Integration states -----------------*//
    const [show, setShow] = useState(false);
    const [inputPasswordType, setInputPasswordType] = useState("password");
    //*----------------- Form -----------------*//
    //register et handleSubmit sont deux des fonctions de useForm
    const { register, handleSubmit, control } = useForm<FormInput>();
    const myHandleSubmitFunction = (data) => console.log(data)

    const handleShowPassword = () => {
        setShow(!show);
        setInputPasswordType("text");
    }

    return (
        <main className="text-slate-900 pt-16">
            <Container
                maxWidth={'xs'}
                className="bg-cyber-white rounded w-[90%] mx-auto py-5">
                    <Typography
                    align="center"
                    className="font-bold text-2xl mb-5">
                        Signup
                    </Typography>
                <form onSubmit={handleSubmit(myHandleSubmitFunction)}>
                    <Box
                    className='bg-cyber-white flex flex-col text-base'>
                            <InputComponent
                            color={"secondary"}
                            name={"firstname"}
                            type={"text"}
                            id={"first name"}
                            placeholder={"firstname"}
                            label={"First name"}
                            //registers a field to the form defined by useForm
                            //{...register("firstname")}
                        />

                        <InputComponent
                            color={"secondary"}
                            type={"text"}
                            id={"last name"}
                            placeholder={"lastname"}
                            label={"Last name"}
                            {...register("lastname")}
                        />
                        <InputComponent
                            color={"secondary"}
                            type={"email"}
                            id={"email"}
                            placeholder={"xxx@email.com"}
                            name={"email"}
                            label={"Email"}
                        />
                        <TextField
                            color="secondary"
                            required
                            type={inputPasswordType}
                            id="password"
                            placeholder="your password*"
                            autoFocus
                            autoComplete="password"
                            fullWidth
                            {...register("password")}
                            InputProps={{
                                endAdornment:
                                <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => handleShowPassword()}
                                edge="end">
                                    {show ? <Visibility/> : <VisibilityOff/> }
                                </IconButton>
                                </InputAdornment>
                            }}
                            />
                        <FormHelperText id="my-helper-text">We'll never share your personal information.</FormHelperText>
                    </Box>
                    <Box className="my-5 flex justify-center items-center">
                        <ButtonComponent text={'Enter'} color={'bg-cyber-purple'}/>
                    </Box>
                </form>
            </Container>
        </main>
    )
}
