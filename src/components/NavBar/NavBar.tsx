
import logo from '../../assets/images/logo-white-small.png';
import { NavLink, Link} from 'react-router-dom';
import  '../../index.css';
import Navmobile from './Navmobile';
import {navLinks} from './data.js';
import {LinkType} from './NavBar.types.ts'
import ButtonComponent from '../ButtonComponent.tsx';
import { Avatar } from '@mui/material';
import { useContext } from 'react';
import { LoginContext } from '../../Contexts/LoginContext';

export default function NavBar() {
    const {isLogged} = useContext(LoginContext);

    return (
        <header className="z-[999] relative w-[100%] mb-10">
            <nav className="navbar mx-auto fixed top-0 w-full px-6  bg-yellow-300">
                <div className="navbar opacity-90 flex justify-between items-center md:py-4 md:pl-4 md:pr-8 px-2 py-2">
                    <div className="flex justify-center items-center">
                        <Link to='/'>
                            <img
                            width={110}
                            src={logo}
                            alt='logo'/>
                        </Link>
                    </div>
                    <Navmobile/>
                    <div className="navbar-md flex-none hidden md:flex md:gap-10 justify-center items-center">
                        <ul className="flex gap-10 list-none menu menu-horizontal items-center">
                            {navLinks.map((link : LinkType) => (
                                    <li key={link.id} className='text-lg text-fuchsia-800 font-bold'>
                                        <NavLink
                                        to={link.hash}
                                        className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "active" : ""
                                        }>{link.name}</NavLink>
                                    </li>
                            ))}
                            {isLogged ?
                                <li>
                                    <Avatar className='bg-cyan-700'></Avatar>
                                </li>
                                : null
                            }
                        </ul>
                        {!isLogged ?
                            <Link to='/login'>
                                <ButtonComponent text={'Login'} color={'bg-slate-950'}/>
                            </Link>
                            :
                            null
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
    }
