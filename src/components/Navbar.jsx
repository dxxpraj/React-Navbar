import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { BiMenuAltRight } from 'react-icons/bi';
import avatar from '../images/avatar.png'

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const menuRef = useRef();
    const Categories = [
        { name: "About", navLink: "/about" },
        { name: "Contact", navLink: "/contact" },
        { name: "Services", navLink: "/services" },
    ];

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setIsMobile(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    });
    return (
        <div className='h-12 px-4 md:px-8 lg:px-0 bg-gray-200 shadow-sm sticky top-0'>
            <div className='max-w-[1140px] mx-auto h-full'>
                <div className='flex items-center justify-between h-full'>
                    <Link to='/'><h4 className='text-xl text-gray-900 font-black font-sans tracking-wide'>LOGO</h4></Link>
                    <div className='hidden md:block'>
                        <ul className='flex'>
                            {Categories.map((category, i) => {
                                return (
                                    <li key={i} className='ms-8'>
                                        <Link to={category.navLink} className='text-sm text-gray-900 font-medium'><span>{category.name}</span></Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div onClick={() => setIsMobile(true)} className='cursor-pointer md:hidden p-1 border border-gray-400 rounded-md'>
                        <BiMenuAltRight className='text-xl text-gray-900' />
                    </div>
                </div>
                <div className={isMobile ? 'absolute top-0 right-0 w-full h-[100vh] bg-black z-40 opacity-50' : 'hidden'}></div>
                <div ref={menuRef} className={`block md:hidden absolute top-0 left-0 bg-gray-50 w-[70%] h-[100vh] z-50 ${isMobile ? "translate-x-0 transition ease-in-out duration-300" : "translate-x-[-100vw] transition ease-in-out duration-300"}`}>
                    <div className='px-4 py-8 bg-gray-200'>
                        <div className='w-20 h-20 rounded-full border-4 border-gray-50 overflow-hidden'>
                            <img src={avatar} alt="Profile" />
                        </div>
                        <p className='mt-4 text-base font-semibold text-gray-900'>Chris Anthemum</p>
                        <p className='text-xs mt-1'>chrisanthemum@gmail.com</p>
                    </div>
                    <ul className='w-full p-4'>
                        {Categories.map((category, i) => {
                            return (
                                <li onClick={() => setIsMobile(false)} key={i} className='text-sm py-4 border-b'>
                                    <Link to={category.navLink}><span>{category.name}</span></Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar