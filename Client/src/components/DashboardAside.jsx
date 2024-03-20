import { faAddressBook, faAddressCard, faBuilding, faList, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function DashborardAside() {
    
    const optionsLink = [
		{ p: 'Empresas', icon: faBuilding, url: '/companies' },
		{ p: 'Aspirantes', icon: faUser, url: '/candidates' },
		{ p: 'Profesiones', icon: faList, url: '/professions' },
		{ p: 'Postulate Aquí', icon: faAddressCard, url: '/postulate' },
		{ p: 'Contacto', icon: faAddressBook, url: '/contact' },
    ]
    
    return (
        <aside
            className='
				md:w-1/4 flex flex-col relative justify-start items-center md:pt-10 
				bg-white dark:bg-dark-primary'
        >
            <div className='flex flex-col sticky top-28 p-5 md:py-0 md:px-0'>
                <div className='mb-4 md:mb-6'>
                    <p className='text-md dark:text-gray-200 text-primary font-bold'>OPCIONES</p>
                </div>
                <div className='flex flex-row flex-wrap gap-5'>
                    {optionsLink.map((op, index) => (
                        <Link
                            key={index}
                            to={op.url}
                            className={`
								min-w-48 p-3 md:p-0 mb-2
								flex flex-row flex-grow md:flex-grow-0 gap-x-2 items-center
								text-sm hover:text-primary focus:text-primary
								dark:text-gray-200 dark:hover:text-primary dark:focus:text-primary
								border border-gray-200 hover:border-primary focus:border-primary md:border-none
								rounded-md
								shadow-lg dark:shadow-none shadow-gray-200 md:shadow-none 
								hover:cursor-pointer duration-300`}
                        >
                            <FontAwesomeIcon icon={op.icon} />
                            <p>{op.p}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    )
}

export default DashborardAside