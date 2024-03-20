import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage.jsx'
import Navbar from './components/Navbar.jsx'
import DashboardCandidates from './components/DashboardCandidates.jsx'
import Professions from './components/DashboardProfessions.jsx'
import Footer from './components/Footer.jsx'
import NotFound from './components/NotFound.jsx'
import DashboardContact from './components/DashboardContact.jsx'
import DashboardCandidateProfile from './components/DashboardCandidateProfile.jsx'

function App() {
	
	const toggleDarkMode = () => {
		document.documentElement.classList.toggle('dark')
	}

	return (
		<BrowserRouter>
			<Navbar toggleDarkMode={toggleDarkMode} />
			<Routes>
				<Route path="/" element={<DashboardPage />}>
					<Route index element={<DashboardCandidates />} />
					<Route path="candidates" element={<DashboardCandidates />} />
					<Route path="candidates/:id" element={<DashboardCandidateProfile />} />
					<Route path="professions" element={<Professions />} />
					<Route path="contact" element={<DashboardContact />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
			<Footer />
		</BrowserRouter>
	)
}

export default App
