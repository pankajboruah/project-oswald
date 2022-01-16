import React from 'react';
import routePaths from 'app/routePaths';

import { Card } from 'antd';
import ModulePageHeader from 'sharedComponents/ModulePageHeader';

import Overview from './sections/Overview';
import BanksListPage from './sections/BanksListPage';

const navLinks = [
	{
		path: routePaths.overview.route,
		label: 'Overview',
		isAllowed: true,
	},
	{
		path: routePaths.banksListPage.route,
		label: 'Bank List Page',
		isAllowed: true,
	},
];

const getTabContent = (tabKey) => {
	switch (tabKey) {
		case routePaths.overview.route:
			return (
				<Card style={{ marginTop: 16, minHeight: 300 }} bodyStyle={{ padding: 0 }}>
					<Overview />
				</Card>
			);
		case routePaths.banksListPage.route:
			return (
				<Card style={{ marginTop: 16 }}>
					<BanksListPage />
				</Card>
			);
		default:
			return <Card style={{ marginTop: 16 }} bodyStyle={{ padding: 0 }} />;
	}
};

const LandingPage = () => {
	return (
		<Card style={{ minHeight: 400 }}>
			<ModulePageHeader
				title="Bank Management"
				subTitle="Check out banks in your city."
				navLinks={navLinks}
			/>
			<Card
				style={{ marginTop: 16, border: 'none', padding: 0 }}
				bodyStyle={{ padding: 0 }}
			>
				{getTabContent(location.pathname)}
			</Card>
		</Card>
	);
};

export default LandingPage;
