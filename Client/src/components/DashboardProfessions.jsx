import React, { useEffect, useState } from 'react'
import { getProfessionsRequest } from '../api/profession';

function Professions() {

    const [professions, setProfessions] = useState([]);
    const [totalPages, setTotalPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [professionsParams, setProfessionsParams] = useState({
        page: 1
    })

    const fetchProfessions = async () => {
        try {
            const res = await getProfessionsRequest(professionsParams);
            // console.log(res);
            if (res.status === 200) {
                setProfessions(res.data.data);
                const arrayOfPages = Array.from({ length: res.data.meta.totalPages }, (_, i) => i + 1);
                setTotalPages(arrayOfPages);
                setCurrentPage(res.data.meta.currentPage);
            }
        } catch (error) {
            console.log(error);
            setProfessions([]);
            setTotalPages([]);
            setCurrentPage(0);
        }
    }

    useEffect(() => {
        fetchProfessions(professionsParams);
    }, [])

    useEffect(() => {
        // console.log(professionsParams);
        fetchProfessions(professionsParams);
    }, [professionsParams])

    return (
        <div className='w-full pb-10'>
            {professions.length > 0 ? (
                <div className='min-h-96'>
                    <h3 className='
                            mb-3
                            text-2xl text-center font-bold
                            dark:text-white'
                    >
                        Profesiones:
                    </h3>
                    <div
                        className='
                            flex flex-col gap-y-2 mb-5
                            mx-auto min-w-max max-w-3/4'
                    >
                        {professions.map((profession, index) => (
                            <p key={index}
                                className='
                                text-md text-center w-full py-2
                                font-bold cursor-pointer
                                text-white dark:text-black
                                bg-primary hover:bg-hover-primary
                                dark:bg-white
                                rounded-sm duration-100'
                            >
                                {profession.profession}
                            </p>
                        ))}
                    </div>
                    {/* Paginación */}
                    <div className='w-full text-center bg-transparent pb-10'>
                        {totalPages.map((pageNumber, index) => {
                            if (pageNumber == currentPage) {
                                return (
                                    <span
                                        className={`
                                            px-2 py-1 m-2 rounded-sm
                                            text-white dark:text-black-200
                                            border border-primary dark:border-white
                                            bg-primary dark:bg-gray-200
                                            cursor-pointer duration-300`}
                                        key={index}
                                    >
                                        {pageNumber}
                                    </span>
                                )
                            }
                            return (
                                <span
                                    className={`
                                        px-2 py-1 m-2 rounded-sm
                                        bg-white hover:bg-primary dark:bg-dark-primary dark:hover:bg-white
                                        text-primary hover:text-white dark:text-white dark:hover:text-black-200
                                        border border-primary dark:border-white
                                        cursor-pointer duration-300`}
                                    key={index}
                                    onClick={() => setProfessionsParams({
                                        page: pageNumber
                                    })}
                                >
                                    {pageNumber}
                                </span>
                            )
                        })}
                    </div>
                </div>
            ) : (
                <h3 className='text-center dark:text-white'>
                    No hay profesiones para mostrar...
                </h3>
            )}
        </div>
    )
}

export default Professions