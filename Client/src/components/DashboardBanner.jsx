import React from 'react'

function Banner() {
    return (
        <div className='md:mt-10 flex flex-col md:ps-5 pb-5'>
            <h2 className='text-3xl mb-3 text-center md:text-left text-gray-400'>Búsqueda y Selección</h2>
            <p className='text-lg text-gray-400 text-center mb-3 px-3'>Encontramos talento para tu empresa, en todos los cargos administrativos, profesionales y técnicos.</p>
            <img
                className='w-full h-auto object-cover md:rounded-sm'
                src="/public/img/banner.jpg"
                alt="banner"
            />
        </div>
    )
}

export default Banner