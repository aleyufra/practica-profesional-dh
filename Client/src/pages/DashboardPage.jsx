import '../../public/css/DashboardPage.css'
import { Outlet, useLocation } from 'react-router-dom'
import DashboardBanner from '../components/DashboardBanner'
import DashboardAside from '../components/DashboardAside'
import { useEffect } from 'react';

function DashboardPage() {
	const location = useLocation();

	const routesWithBanner = [
		'/candidates',
		'/candidates/:id',
		'/professions',
	];
	const renderBanner = routesWithBanner.includes(location.pathname);

	return (
		<main className='bbg-white dark:bg-dark-primary min-h-max'>
			<div className='mx-auto max-w-7xl md:px-10 xl:px-5 2xl:px-0'>
				<div className='flex flex-col md:flex-row'>
					<DashboardAside />
					<div className='flex flex-col md:w-3/4'>
						{renderBanner ? <DashboardBanner /> : null}
						<Outlet />
					</div>
				</div>
			</div >
		</main>
	)
}

export default DashboardPage