import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import { PageHeader, Menu, Row, Typography } from 'antd';

const ModulePageHeader = ({ title, subTitle, navLinks }) => {
	const location = useLocation();
	const navItems = navLinks.map((item) => (
		<Menu.Item key={item.path} disabled={!item.isAllowed} hidden={item.isHidden}>
			<NavLink to={item.path}>{item.label}</NavLink>
		</Menu.Item>
	));

	return (
		<PageHeader
			title={title}
			footer={
				<Menu
					style={{ textAlign: 'left' }}
					mode="horizontal"
					selectedKeys={[location.pathname]}
				>
					{navItems}
				</Menu>
			}
			style={{ padding: 0 }}
		>
			<Row>
				<div style={{ flex: 1 }}>
					<Typography.Paragraph>{subTitle}</Typography.Paragraph>
				</div>
			</Row>
		</PageHeader>
	);
};

ModulePageHeader.propTypes = {
	title: PropTypes.string,
	subTitle: PropTypes.string,
	navLinks: PropTypes.array,
};

export default ModulePageHeader;
