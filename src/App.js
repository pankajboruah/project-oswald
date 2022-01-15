import React from 'react';
import { Card, Input } from 'antd';
import './sass/index.scss';
import './App.scss';

function App() {
	return (
		<div>
			<header>
				<Card title="Card">
					Scaffold
					<Input placeholder="Enter some value" type="number" />
				</Card>
			</header>
		</div>
	);
}

export default App;
