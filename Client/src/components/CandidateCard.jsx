import React from 'react';
import { Link } from 'react-router-dom';

function CandidateCard({ candidate, index }) {
    return (
        <Link
            className='border min-h-64 max-h-max border-gray-100 rounded-md shadow-lg'
            key={index}
            to={`/candidate/${candidate.id}`}
        >
            <div className=' h-max py-5 px-3 overflow-hidden'>
                <img
                    className='w-32 h-32 object-cover rounded-full mx-auto shadow-md shadow-gray-400'
                    src={candidate.image}
                    alt={candidate.name}
                />
            </div>
            <div className='h-1/3 py-3 px-5'>
                <p className='font-bold text-ellipsis line-clamp-2 text-center mb-1'>
                    {candidate.name.split(' ')[0]} {candidate.surname}
                </p>
                <ul>
                    {candidate.professions && candidate.professions.length > 0 && (
                        candidate.professions.map((p, index) => (
                            <li
                                key={index}
                                className='text-sm text-gray-600 text-center'
                            >
                                {p.profession}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </Link>
    )
}

export default CandidateCard