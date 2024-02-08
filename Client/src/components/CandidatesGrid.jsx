import { useEffect, useState } from 'react'
import { getCandidatesRequest } from '../api/candidates';
import CandidateCard from './CandidateCard';
import '../../public/css/CandidateGrid.css';

function CandidatesGrid() {
    const [candidates, setCandidates] = useState([]);
    const [totalPages, setTotalPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const fetchCandidates = async (page) => {
        try {
            const result = await getCandidatesRequest(page);
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
		fetchCandidates(1);
	}, []);

    return (
        <div className='flex flex-col'>
            <div className='grid grid-autofill gap-4 p-4'>
                {candidates.map((candidate, index) => (
                    <CandidateCard candidate={candidate} key={index} />
                ))}
            </div>
            <div className='w-full text-center'>
                {totalPages.map((pageNumber, index) => {
                    if (pageNumber == currentPage) {
                        return (
                            <span
                                className='bg-blue-700 text-white px-2 py-1 m-2 rounded-sm shadow-sm border border-blue-700 shadow-gray-300 hover:cursor-pointer duration-300'
                                key={index}
                                onClick={() => fetchCandidates(pageNumber)}
                            >
                                {pageNumber}
                            </span>
                        )
                    }
                    return (
                        <span
                            className='px-2 py-1 m-2 text-blue-700 rounded-sm shadow-sm shadow-gray-300 border border-blue-700 hover:bg-blue-700 hover:text-white hover:cursor-pointer duration-300'
                            key={index}
                            onClick={() => fetchCandidates(pageNumber)}
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