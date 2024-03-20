import React from 'react'

function DashboardContact() {
    return (
        <div className='pt-10 min-h-max mb-60 w-full'>
            <div className='w-full mx-auto flex flex-col items-start gap-y-3 max-w-3/4'>
                <h2 className='text-3xl w-full text-center text-primary dark:text-white'>
                    Contacto
                </h2>
                <p className='
                        py-1 px-3
                        text-md text-gray-400 dark:text-white
                        border border-gray-400
                        rounded'
                >
                    Para: rh@digitalhouse.com
                </p>
                <textarea
                    className='
                        w-full min-h-32 h-40 p-3 
                        bg-white dark:bg-dark-primary 
                        text-lg text-gray-400 dark:text-white
                        border border-gray-400 focus:border-gray-600 dark:focus:border-white
                        outline-none
                        rounded'
                    placeholder='Escriba su mensaje aqui...'
                >
                </textarea>
                <button
                    type='button'
                    className='
                        w-full md:w-max py-2 md:px-16
                        text-white
                        bg-primary hover:bg-hover-primary
                        dark:text-black
                        dark:bg-white dark:hover:bg-gray-300
                        rounded-sm'
                >
                    Enviar
                </button>
            </div>
        </div>
    )
}

export default DashboardContact