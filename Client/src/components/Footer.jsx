import React from 'react'

function Footer() {

    const classFooterLink = 'hover:text-slate-400 dark:text-gray-300 dark:hover:text-white duration-150 cursor-pointer'

    return (
        <footer
            className='
                w-full h-max flex flex-col justify-end 
                bg-white dark:bg-dark-primary
                border-t border-gray-200
            '
        >
            <div className='flex flex-col gap-y-5 md:flex-row justify-start md:justify-end md:gap-x-20 px-5 pb-5 md:px-10 pt-10'>
                <ul className='text-xs flex flex-col gap-y-2 text-gray-500 font-roboto'>
                    <li>
                        <a href="#" className={classFooterLink}>
                            Licencias
                        </a>
                    </li>
                    <li>
                        <a href="#" className={classFooterLink}>
                            Desarrolladores
                        </a>
                    </li>
                    <li>
                        <a href="#" className={classFooterLink}>
                            Acerca de
                        </a>
                    </li>
                    <li>
                        <a href="#" className={classFooterLink}>
                            Carreras
                        </a>
                    </li>
                </ul>
                <ul className='text-xs flex flex-col gap-y-2 text-gray-500 font-roboto'>
                    <li>
                        <a href="#" className={classFooterLink}>
                            Ayuda
                        </a>
                    </li>
                    <li>
                        <a href="#" className={classFooterLink}>
                            Términos y Condiciones
                        </a>
                    </li>
                    <li>
                        <a href="#" className={classFooterLink}>
                            Privacidad
                        </a>
                    </li>
                    <li>
                        <a href="#" className={classFooterLink}>
                            Contáctenos
                        </a>
                    </li>
                </ul>
            </div>
            <div className='flex flex-col justify-end'>
                <p className='text-center text-gray-400 text-pretty py-2 font-roboto tracking-4 text-xs'>
                    Copyright©2024 - DigitalHouse - GRUPO 50 - All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer