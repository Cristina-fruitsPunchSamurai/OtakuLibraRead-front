
import { useState, useContext} from "react";
import { LoginContext } from "../Contexts/LoginContext";
import { Link, useNavigate } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import {BASE_URL} from "../utils/API";

interface FormInput {
    email: string,
    password: string,

}

export default function Login() {
//*----------------- Integration states -----------------*//
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [loginPasswordType, setLoginPasswordType] = useState('password');

    const {setIsLogged} = useContext(LoginContext);
    const navigate = useNavigate();

//*----------------- Function that toggles visibility of password -----------------*//
    const showPassword = () => {
        setShowLoginPassword(!showLoginPassword);
        loginPasswordType === 'password' ? setLoginPasswordType('text') : setLoginPasswordType('password');
    }


//*-----------------------------  Form ----------------------------- *//
    const {register, handleSubmit,reset, formState: { errors }} = useForm<FormInput>();


//*-----------------------------  Form submission ----------------------------- *//
//je recupère les valeur des champs et je les passe dans le body à ma requête *//
    const onSubmit: SubmitHandler<FormInput> = async (data) => {
        await loginUser(data);
    }


//*-----------------------------  API request ----------------------------- *//
const loginUser = async(credentials :FormInput)=> {
    try{
        const result = await axios.post(`${BASE_URL}/login`, credentials);
        console.log(result.data)
        setIsLogged(true);
        reset();
        navigate('/');
    }catch(error){
        console.log(error);
    }
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
                    <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                        </div>
                        <div className="mb-6">
                            <div className="relative">
                                <label className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="password">
                                    Password
                                </label>
                                <input
                                className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-cyber-purple"
                                id="password"
                                type={loginPasswordType}
                                placeholder="***"
                                {...register("password", {
                                    required: 'Password is missing',
                                    pattern: {
                                        value:  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:;<>,.?~[\]-]).{8,}$/,
                                        message :'Password must contain at least 8 characters, one uppercase, one lowercase and one special character'
                                        }
                                    })
                                }
                                />
                                <span
                                onClick={showPassword}
                                className="absolute right-3 top-8 cursor-pointer">
                                    { showLoginPassword ?  <Visibility /> : <VisibilityOff />}
                                </span>
                            </div>
                            {errors.password && <p role='alert' className="text-red-500 text-xs">{errors.password.message}</p>}
                        </div>
                        <Box className="my-5 flex justify-center items-center">
                            <button className="cursor-pointer rounded text-white px-6 py-3 bg-cyber-purple" type="submit">
                                Login
                            </button>
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
