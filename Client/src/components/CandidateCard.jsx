import React from 'react';
import { Link } from 'react-router-dom';

function CandidateCard({ candidate, index }) {
    return (
        <Link
            className='
                min-h-72 max-h-max rounded 
                bg-white dark:bg-dark-primary
                shadow-md shadow-gray-200 dark:shadow-none hover:shadow-lg 
                border border-gray-200 dark:border-gray-400'
            key={index}
            to={`/candidates/${candidate.id}`}
        >
            <div className=' h-max py-5 px-3 overflow-hidden'>
                <img
                    className='w-32 h-32 object-cover rounded-full mx-auto shadow-md shadow-gray-400 dark:shadow-none dark:border dark:border-gray-200'
                    src={candidate.image}
                    alt={candidate.name}
                />
            </div>
            <div className='h-1/3 py-3 px-5'>
                <p className='font-bold dark:text-gray-200 text-ellipsis line-clamp-2 text-center mb-1'>
                    {candidate.name} {candidate.surname}
                </p>
                <ul>
                    {candidate.Profession && candidate.Profession.length > 0 && (
                        candidate.Profession.map((p, index) => {
                            if (index < 2) {
                                return (
                                    <li key={index}
                                        className='text-sm text-slate-600 dark:text-gray-400 text-center'
                                    >
                                        {p.profession}
                                    </li>
                                )
                            } else if (index === 2) {
                                return (
                                    <li key={index}
                                        className='text-lg text-slate-400 dark:text-gray-400 text-center'
                                    >
                                        ...
                                    </li>
                                )
                            }
                        })
                    )}
                </ul>
            </div>
        </Link>
    )
}

export default CandidateCard