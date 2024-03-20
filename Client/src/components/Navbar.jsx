import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faArrowRightFromBracket, faUser, faUserPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'

function Navbar({ toggleDarkMode }) {

    const navLinks = [
        { p: 'Agregar Aspirante', icon: faUserPlus, url: '/postulate' },
        { p: 'Perfil', icon: faUser, url: '/profile' },
        { p: 'Cerrar Sesión', icon: faArrowRightFromBracket, url: '/logout' },
    ]

    const dropMenu = () => {
        document.querySelector('.navbar-menu').classList.toggle('hidden')
    }
    return (
        <nav
            className='
                w-full min-h-16 max-h-max flex z-50
                px-3 py-2 md:pe-10 xl:px-0 sticky top-0
                bg-white dark:bg-dark-primary 
                border-b border-b-primary md:border-gray-200 dark:border-b-gray-400'
        >
            <div className='flex flex-col w-full max-w-7xl mx-auto'>
                <div className='flex flex-row w-full- h-full justify-start md:justify-between items-center md:gap-x-10'>
                    {/* boton menu hamburguesa */}
                    <button
                        type='button'
                        className='block md:hidden'
                        onClick={() => dropMenu()}
                    >
                        <FontAwesomeIcon
                            className='p-2 text-2xl text-primary dark:text-gray-200 font-bold border border-primary dark:border-gray-200 rounded-md'
                            icon={faBars}
                        />
                    </button>
                    {/* logo */}
                    <div className='flex flex-row items-center'>
                        <img
                            className='w-18 h-6 object-contain ms-4 xl:ms-0 hidden md:block'
                            src="/public/img/logo-dh.png"
                            alt="logo-digital-house"
                        />
                        <Link to={'/'} className='text-md md:text-xl text-black dark:text-gray-200 font-roboto tracking-3 ps-3'>
                            Digital House
                        </Link>
                    </div>
                    {/* buscar y iconos */}
                    <div className='hidden md:flex md:flex-row md:flex-grow justify-between items-center'>
                        <div className='flex flex-row gap-x-2 relative'>
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                className='text-xl text-primary dark:text-gray-200 absolute left-3 top-2.5'
                            />
                            <input
                                type='text'
                                placeholder='Buscar...'
                                className='
                                    max-w-sm outline-none py-2 px-3 ps-11 rounded-full
                                    border border-transparent 
                                    bg-gray-100 focus:border-primary
                                    dark:bg-dark-secondary dark:focus:border-gray-200 dark:text-gray-200'
                            />
                        </div>
                        <div className='flex flex-row gap-x-5'>
                            {navLinks.map((item, index) => (
                                <Link key={index} to={item.url} className='my-3'>
                                    <FontAwesomeIcon
                                        icon={item.icon}
                                        className='text-xl pe-1 text-primary dark:text-gray-200'
                                    />
                                </Link>
                            ))}
                            <div className='my-3 block dark:hidden cursor-pointer' onClick={() => toggleDarkMode()}>
                                <FontAwesomeIcon
                                    icon={faMoon}
                                    className='text-2xl pe-1 text-primary'
                                />
                            </div>
                            <div className='my-3 hidden dark:block cursor-pointer' onClick={() => toggleDarkMode()}>
                                <FontAwesomeIcon
                                    icon={faSun}
                                    className='text-2xl pe-1 text-primary'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Navbar menu en mobile */}
                <div className='navbar-menu ps-1 md:hidden'>
                    <ul className='py-5 flex flex-col gap-y-5'>
                        <li className='text-primary mt-3'>
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                className='text-xl pe-2 text-primary dark:text-gray-200'
                            />
                            <input
                                type='text'
                                className='border border-transparent max-w-sm outline-none dark:bg-dark-primary focus:border focus:border-b-blue-700 dark:text-gray-200'
                                placeholder='Buscar'
                            />
                        </li>
                        {navLinks.map((item, index) => (
                            <Link key={index} to={item.url} className='text-primary mt-3 dark:text-gray-200'>
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    className='text-xl pe-2 text-primary dark:text-gray-200'
                                />
                                {item.p}
                            </Link>
                        ))}
                        <li className='mt-3 flex dark:hidden cursor-pointer' onClick={() => toggleDarkMode()}>
                            <FontAwesomeIcon
                                icon={faMoon}
                                className='text-2xl pe-1 text-primary'
                            />
                            <p className='ps-1 text-primary dark:text-gray-200'>Modo oscuro</p>
                        </li>
                        <li className='mt-3 hidden dark:flex cursor-pointer' onClick={() => toggleDarkMode()}>
                            <FontAwesomeIcon
                                icon={faSun}
                                className='text-2xl pe-1 text-primary'
                            />
                            <p className='ps-1 text-primary dark:text-gray-200'>Modo claro</p>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar