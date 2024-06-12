
import { useState, useContext, useEffect} from "react";
import { LoginContext } from "../Contexts/LoginContext";
import { Link, useNavigate } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import {FieldErrors, SubmitHandler, set, useForm} from "react-hook-form";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import {BASE_URL} from "../utils/API";
import toast, { Toaster } from 'react-hot-toast';
import { DevTool } from "@hookform/devtools";
import { purple } from "@mui/material/colors";


interface FormInput {
    email: string,
    password: string,

}

export default function Login() {
    console.log('login rendered')
//*----------------- Integration states -----------------*//
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [loginPasswordType, setLoginPasswordType] = useState('password');

    const {setIsLogged} = useContext(LoginContext);
    const navigate = useNavigate();

    const notify = (errorMessage) => {
        toast.error(errorMessage);
        };

//*----------------- Function that toggles visibility of password -----------------*//
    const showPassword = () => {
        setShowLoginPassword(!showLoginPassword);
        loginPasswordType === 'password' ? setLoginPasswordType('text') : setLoginPasswordType('password');
    }


//*-----------------------------  Form ----------------------------- *//
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: {
            errors,
            isValid,
            isSubmitting,
            isSubmitSuccessful,
        }} = useForm<FormInput>();
    //*-----------------------------  Form submission ----------------------------- *//
//je recupère les valeur des champs et je les passe dans le body à ma requête *//
    const onSubmit: SubmitHandler<FormInput> = async (data) => {
        await loginUser(data);
    }


    useEffect(() => {
        isSubmitSuccessful ? notify('You are logged in!') : null
        reset();
    }, [isSubmitSuccessful])

//*-----------------------------  Form errors ----------------------------- *//
// la function handleSubmit prend errors en paramètre, et il a un type FieldErrors (de useForm) de mon type forminput
    const onError = (errors : FieldErrors<FormInput>)=> {
        console.log('errors', errors);
        notify(errors.email?.message);
        notify(errors.password?.message);
        }


//*-----------------------------  API request ----------------------------- *//
const loginUser = async(credentials :FormInput)=> {
    try{
        const result = await axios.post(`${BASE_URL}/login`, credentials);
        //localStorage.setItem('token', result.data.token);
        setIsLogged(true);
        setTimeout(() => {
            navigate('/');
        }, 2000);
    }catch(error){
        notify('Sorry no user found.');
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
                    onSubmit={handleSubmit(onSubmit, onError)}
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
                                    },
                                // validate:{
                                //     notAdmin:(fieldValue) => {
                                //         return fieldValue !== 'admin@exemple.com'
                                //         || 'Enter a different email!'
                                //     },
                                //     notBlackListed:(fieldValue)=> {
                                //     return !fieldValue.endsWith('.biz') || 'This email is blacklisted'
                                // }
                                // },
                            })}
                            />
                            <span className="text-red-500 text-xs">{errors.email?.message}</span>
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
                            <p role='alert' className="text-red-500 text-xs">{errors.password?.message}</p>
                        </div>
                        <Box className="my-5 flex justify-center items-center">
                            <button
                            disabled={!isValid || isSubmitting}
                            className={`cursor-pointer rounded text-white px-6 py-3 ${!isValid ? "bg-purple-400" : "bg-cyber-purple"}`}
                            type="submit">
                                Login
                            </button>
                        </Box>
                    </form>
                    <DevTool control={control}/>
                    <Link to='/signup'>
                        <Typography
                        align="left"
                        className="text-xs mb-5 underline">
                            You don't have an account yet?
                        </Typography>
                    </Link>
                    <Toaster />
                </Container>
        </main>
    )
}
