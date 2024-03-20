import { useEffect, useState } from 'react'
import { getCandidatesRequest } from '../api/candidates';
import CandidateCard from './CandidateCard';
import '../../public/css/CandidateGrid.css';

function CandidatesGrid() {
    const [candidates, setCandidates] = useState([]);
    const [totalPages, setTotalPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const [searchParams, setSearchParams] = useState({
        page: 1,
    });


    const fetchCandidates = async (object) => {
        try {
            const result = await getCandidatesRequest(object);
            // console.log(result)
            if (result.status === 200) {
                setCandidates(result.data.data);
                const arrayOfPages = Array.from({ length: result.data.meta.totalPages }, (_, i) => i + 1);
                setTotalPages(arrayOfPages);
                setCurrentPage(result.data.meta.currentPage);
            } else {
                setCandidates([]);
                setTotalPages([]);
            }
        } catch (error) {
            console.error(error);
            setCandidates([]);
        }
    }

    useEffect(() => {
        fetchCandidates(searchParams);
    }, []);

    const handleFetchCandidates = (e, name) => {
        setSearchParams({
            ...searchParams,
            [name]: e.target.value
        })
    }

    const handleSearchCandidates = (e) => {
        setSearchParams({
            ...searchParams,
            name: e.target.value,
            surname: e.target.value,
        })
    }

    useEffect(() => {
        // console.log(searchParams)
        fetchCandidates(searchParams)
    }, [searchParams]);


    return (
        <div className='flex flex-col w-full'>
            {/* filtros y barra de búsqueda */}
            <div
                className='
                flex flex-col md:flex-row gap-x-8 gap-y-3 md:gap-y-0 md:items-center
                py-2 px-5 md:px-0 mb-3'
            >
                {/* Barra de búsqueda */}
                <input
                    className='
                        w-full md:max-w-72 py-2 px-3
                        bg-transparent
                        dark:text-white
                        border border-gray-400 focus:border-primary
                        outline-none
                        rounded-md'
                    type='text'
                    name='name'
                    placeholder='Buscar Aspirante...'
                    onChange={(e) => handleSearchCandidates(e)}
                />
                {/* Filtros de búsqueda por género */}
                <div className='flex flex-col md:flex-row gap-x-2 md:items-center'>
                    <span className='dark:text-white'>
                        Género:
                    </span>
                    <select
                        className='
                            w-full md:w-max py-2 px-1
                            border border-gray-400 focus:border-primary
                            bg-transparent dark:bg-dark-primary
                            dark:text-white
                            rounded-md'
                        name='gender'
                        onChange={(e) => handleFetchCandidates(e, e.target.name)}
                    >
                        <option value=''>Todos</option>
                        <option value='hombre'>Hombre</option>
                        <option value='mujer'>Mujer</option>
                    </select>
                </div>
            </div>
            {/* Lista de Aspirantes */}
            <div className='grid grid-autofill gap-4 p-4 md:pt-5 md:pb-10 md:px-3 bg-transparent'>
                {candidates.map((candidate, index) => (
                    <CandidateCard candidate={candidate} key={index} />
                ))}
            </div>
            {/* En caso de que no se encuentren aspirantes */}
            {candidates.length === 0 && (
                <h2 className='text-xl font-poppins text-gray-600 text-center mt-8'>
                    No hay resultados...
                </h2>
            )}
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
                            onClick={() => setSearchParams({
                                ...searchParams,
                                page: pageNumber
                            })}
                        >
                            {pageNumber}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}

export default CandidatesGrid