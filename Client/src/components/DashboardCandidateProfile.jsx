import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getCandidateRequest } from '../api/candidates';

function CandidateProfile() {

	const location = useLocation();
	const candidateId = location.pathname.split('/').pop();

	const [candidate, setCandidate] = useState({});

	const fetchCandidate = async (id) => {
		try {
			const res = await getCandidateRequest(id);
			if (res.status === 200) {
				setCandidate(res.data.data);
			}
		} catch (error) {
			console.error(error);
			setCandidate({});
		}
	}

	useEffect(() => {
		// console.log('se renderizo el candidate profile ->', candidateId);
		// console.log(candidate);
		fetchCandidate(candidateId);
	}, [])


	return (
		<div className='w-full py-10'>
			<div className='max-w-3/4 mx-auto flex flex-col items-center gap-y-3'>
				<img
					className='w-52 h-52 object-cover rounded-full'
					src={candidate.image}
					alt={candidate.name}
				/>
				<div className='w-full'>
					<h2 className='text-lg md:text-2xl mb-2 font-bold text-center dark:text-white text-ellipsis line-clamp-2'>
						{candidate.name} {candidate.surname}
					</h2>
					<ul className='w-full flex flex-col items-center font-bold mb-5'>
						{candidate.Profession && candidate.Profession.length > 0 && (
							candidate.Profession.map((p, index) => (
								<li key={index}
									className='text-gray-600'
								>
									{p.profession}
								</li>
							))
						)}
					</ul>
					<div className='w-full flex flex-col text-gray-600'>
						<h3 className='text-lg mb-1 font-bold text-gray-600'>Mas detalles:</h3>
						<p className='mb-1'>
							DNI: {candidate.dni}
						</p>
						<p className='mb-1'>
							Email: {candidate.email}
						</p>
						{candidate.phone ? (
							<p className='mb-1'>
								Teléfono: {candidate.phone}
							</p>
						) : null}
						<p className='mb-1'>
							Fecha de nacimiento: {candidate.birthday}
						</p>
						<p className='mb-1'>
							Genero: {candidate.gender}
						</p>
						<p className='mb-1'>
							LinkedIn: {candidate.SocialNetwork && candidate.SocialNetwork.linkedin}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CandidateProfile