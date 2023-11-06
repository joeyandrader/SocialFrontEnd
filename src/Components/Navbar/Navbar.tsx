import { useContext, useState } from "react";
import styles from './Navbar.module.css'
import { AiFillCloseCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";
import ImageProfile from "../ImageProfile/ImageProfile";

const Navbar = () => {
    const { user } = useContext(AuthContext)
    const { logout } = useContext(AuthContext)
    const [open, setOpen] = useState<boolean>(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };


    const handleOpen = () => {
        setOpen(prevState => !prevState)
        document.addEventListener('click', handleClickOutside);
    }

    const handleClickOutside = (e: MouseEvent) => {
        const button = document.getElementById('user-menu-button'); // Substitua 'seu-botao' pelo ID do seu botão

        // Verifique se o clique não foi no botão ou em seus descendentes
        if (button && !button.contains(e.target as Node)) {
            setOpen(false);
            // Remova o ouvinte de evento após a ação
            document.removeEventListener('click', handleClickOutside);
        }
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <>
            <nav className="bg-gray-800 fixed w-full">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" onClick={handleMobileMenuToggle}>
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>

                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center text-slate-200 font-semibold">
                                SocialAPP
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <Link to="/" className=" hover:bg-gray-700 text-white rounded-md px-3 py-2 text-sm font-medium">Inicio</Link>
                                    <Link to="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Atividade</Link>
                                    <Link to="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Mensagem</Link>
                                    <Link to="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Caixa de entrada</Link>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button type="button" className="relative rounded-full bg-gay-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mr-2">
                                <span className="absolute -inset-1.5"></span>
                                <span className="sr-only">View notifications</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                </svg>
                            </button>
                            <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="absolute -inset-1.5"></span>
                                <span className="sr-only">View notifications</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                </svg>
                            </button>

                            <div className="relative ml-3">
                                <div>
                                    <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true" onClick={handleOpen}>
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">Open user menu</span>
                                        <ImageProfile imageUrl={user?.data.imageUrl} user={user?.data} width="10" height="10" />
                                    </button>
                                </div>
                                {open &&
                                    <>
                                        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={1}>
                                            <a href="http://www.google.com.br" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={1} id="user-menu-item-0">Meu perfil</a>
                                            <Link to="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={1} id="user-menu-item-1">Configurações</Link>
                                            <Link to="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={1} id="user-menu-item-2" onClick={handleLogout}>Sair</Link>
                                        </div>
                                    </>
                                }
                            </div>
                            <Link to="/post/new" className="ml-5 bg-slate-900 rounded-md p-2 text-slate-200 justify-center items-center gap-2 sm:flex hidden">
                                <AiOutlinePlusCircle size={20} /> Nova postagem
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="sm:hidden" id="mobile-menu">
                    <div className={`${mobileMenuOpen ? 'block translate-y-0 opacity-100' : 'hidden translate-y-[-20px] opacity-0'
                        } space-y-1 px-2 pb-3 pt-2 transition-opacity duration-300 ease-in-out opacity-0`}>
                        <a href="#" className="hover:bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Inicio</a>
                        <a href="#" className="text-gray-300 hover:bg-gray-900 hover-bg-gray-700 hover-text-white block rounded-md px-3 py-2 text-base font-medium">Atividade</a>
                        <a href="#" className="text-gray-300 hover:bg-gray-900 hover-bg-gray-700 hover-text-white block rounded-md px-3 py-2 text-base font-medium">Mensagem</a>
                        <a href="#" className="text-gray-300 hover:bg-gray-900 hover-bg-gray-700 hover-text-white block rounded-md px-3 py-2 text-base font-medium">Caixa de entrada</a>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar