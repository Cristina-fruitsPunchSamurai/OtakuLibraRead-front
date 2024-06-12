
import { Turn as Hamburger } from 'hamburger-react';
import { useState, useRef } from 'react';
import {navLinks} from './data.js';
import { NavLink } from 'react-router-dom';
import {useClickAway} from 'react-use';
import {motion} from 'framer-motion';
import { type LinkType } from './NavBar.types.ts'

export default function Navmobile() {
    const ref = useRef(null);
    const [isOpen, setOpen] = useState(false);

    useClickAway(ref,()=> {
        if(isOpen) {
            setOpen(false)
        }
    })

    return (
            <div ref={ref} className="md:hidden h-[50%]">
            <Hamburger color="#6b21a8" toggled={isOpen} size={20} toggle={setOpen} direction='right' />
            {isOpen && (
                    <div
                    className="fixed left-0 shadow-4xl right-0 top-[3.5rem] bg-slate-50 p-5 pt-0 border-b-2 border-b-purple-base">
                    <ul className="grid gap-2 py-6 px-3 bg-opacity-90">
                        {navLinks.map((link :LinkType) => (
                            <li
                            onClick={() => setOpen((prev) => !prev)}
                            key={link.id}
                            className="w-full mb-3 text-purple-base text-lg">
                                <NavLink
                                to={link.hash}
                                className="font-bold text-decoration: none;">
                                {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <motion.div
                        whileHover={{
                        boxShadow : "0px 0px 8px rgb(255, 255, 255)",
                        borderColor:"#747bff"
                        }}
                        className='w-1/5'>
                            <button className=' w-[100%] rounded bg-purple-700 text-white py-2'>
                                Login
                            </button>
                    </motion.div>
                    </div>
            )}
        </div>
    )
}
