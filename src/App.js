import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import Loader from 'sharedComponents/Loader';
import routePaths from './routePaths';

import './sass/index.scss';
import './App.scss';

const LandingPage = React.lazy(() => import('./modules/LandingPage'));
const BankDetailsPage = React.lazy(() => import('./modules/BankDetailsPage'));

function App() {
	return (
		<div>
			<React.Suspense fallback={<Loader loading />}>
				<Routes>
					<Route
						path="/"
						element={<Navigate to={routePaths.banksListPage.route} exact />}
					/>
					<Route exact path={routePaths.overview.route} element={<LandingPage />} />
					<Route
						exact
						path={routePaths.banksListPage.route}
						element={<LandingPage />}
					/>
					<Route
						exact
						path={routePaths.bankDetailsPage.route}
						element={<BankDetailsPage />}
					/>
					{/* NOTE: create 404 not found page for mismatched routes */}
					<Route path="*" element={<Navigate to={'/'} exact />} />
				</Routes>
			</React.Suspense>
		</div>
	);
}

export default App;
