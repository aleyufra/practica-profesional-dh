import { useState, useEffect } from 'react';
import '../../public/css/DashboardPage.css';
import CandidatesGrid from '../components/CandidatesGrid.jsx';

function DashboardPage() {
	
	return (
		<main className='mx-auto border border-gray-400 max-w-7xl'>
			<h1>Aspirantes: </h1>
			<CandidatesGrid />
		</main>
	)
}

export default DashboardPage