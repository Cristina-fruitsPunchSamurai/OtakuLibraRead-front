
import { Container, Box, Typography, FormHelperText} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ButtonComponent from "./ButtonComponent";
import { useState } from "react";
import {useForm, SubmitHandler, set} from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../utils/API";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


interface FormInput {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    password_confirmation: string
}

export default function Signup() {

//*----------------- Integration states -----------------*//
    const [showPassword, setShowPassword] = useState(false);
    const [inputPasswordType, setInputPasswordType] = useState("password");
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [inputPasswordConfirmType, setInputPasswordConfirmType] = useState("password");

    const navigate = useNavigate();

//*-----------------------------   Toggle password -----------------------------  *//
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
        inputPasswordType === "text" ? setInputPasswordType('password'): setInputPasswordType('text');
    }

        const handleShowPasswordConfirm = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
        inputPasswordConfirmType === "text" ?  setInputPasswordConfirmType("password") : setInputPasswordConfirmType("text");
    }


//*-----------------------------  Form ----------------------------- *//
    //register, wtach et handleSubmit sont deux des fonctions de useForm
    const { register, handleSubmit, watch,reset, formState:{errors} } = useForm<FormInput>();
    const [samePassword, setSamePassword] = useState<boolean>(true);


//*-----------------------------  Toast ----------------------------- *//
    const notify = () => toast('Passwords must be the same', {
        style: {
                    animationDuration: '0.5s',
                    backgroundColor: '#f5f3ff',
                    border: '2px solid',
                    color: '#991b1b',
                    borderRadius: '10px',
                }
    });


//*-----------------------------   API request ----------------------------- *//
    const postNewUser = async(userData:FormInput)=> {
        try {
            const result = await axios.post(`${BASE_URL}/register`, userData);
            reset();
            navigate('/login');
        }catch(error) {
            console.log(error)
        }
    }


//*-----------------------------  Form submission ----------------------------- *//
        const onSubmit: SubmitHandler<FormInput> = async (data) => {
            //Check if password and password_confirmation are the same, if not, notify the user
            if(watch("password") === watch("password_confirmation")) {
                setSamePassword(true)
            }else {
                notify();
            return;
            }

        await postNewUser(data);
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
                    <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 relative">
                        <div className="mb-4">
                            <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="firstname">
                                Firstname
                            </label>
                            <input
                            className= "shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-cyber-purple"
                            id="firstname"
                            type="text"
                            placeholder="firstname"
                            {...register("firstname", { required: true })}
                            />
                            {errors.firstname && <span className="text-red-500 text-xs">Your name is missing</span>}
                        </div>
                        <div className="mb-4">
                            <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="lastname">
                                Lastname
                            </label>
                            <input
                            className= "shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-cyber-purple"
                            id="lastname"
                            type="text"
                            placeholder="lastname"
                            {...register("lastname")}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email">
                                Email
                            </label>
                            <input
                            className= "shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-cyber-purple"
                            id="email"
                            type="email"
                            placeholder="email"
                            {...register("email", {
                                required: 'Email is required',
                                pattern: {
                                    value:  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message :'Please enter a valid email'
                                    }
                                })}
                            />
                            {errors.email && <span className="text-red-500 text-xs">Your email is missing</span>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-cyber-purple"
                                id="password"
                                type={inputPasswordType}
                                placeholder="***"
                                {...register("password", {
                                    required: 'Password is missing',
                                    pattern: {
                                        value:  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:;<>,.?~[\]-]).{8,}$/,
                                        message :'Password must contain at least 8 characters, one uppercase, one lowercase and one special character'
                                        }
                                })}
                                />
                                <span className="absolute right-1 top-1 cursor-pointer" onClick={handleShowPassword}>
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </span>
                            </div>
                            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-cyber-purple"
                                id="password_confirmation"
                                type={inputPasswordConfirmType}
                                placeholder="***"
                                {...register("password_confirmation", {
                                    required: 'Please confirm your password',
                                    pattern: {
                                        value:  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:;<>,.?~[\]-]).{8,}$/,
                                        message :'Password must contain at least 8 characters, one uppercase, one lowercase and one special character'
                                        }
                                })}
                                />
                                <span className="absolute right-1 top-1 cursor-pointer" onClick={handleShowPasswordConfirm}>
                                    {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                                </span>
                            </div>
                            {errors.password_confirmation && <span className="text-red-500 text-xs">{errors.password_confirmation.message}</span>}
                        </div>
                        <FormHelperText id="my-helper-text">We'll never share your personal information.</FormHelperText>
                    <Box className="my-5 flex justify-center items-center">
                        <ButtonComponent text={'Enter'} color={'bg-cyber-purple'}/>
                    </Box>
                </form>
            </Container>
            <Toaster/>
        </main>
    )
}
