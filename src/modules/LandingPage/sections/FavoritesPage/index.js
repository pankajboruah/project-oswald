import React, { useState, useEffect, useContext } from 'react';

import { Table, Button, Space, Badge, Modal, Form, Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { BankContext } from 'contexts/BankContext';
import DisplayForm from '../../../BankDetailsPage/components/DisplayForm';
import styles from './index.module.scss';

const paginationMeta = {
	defaultPageSize: 10,
	pageSize: 10,
	size: 'small',
	showSizeChanger: true,
};

const tableTitle = (totalRows) => (
	<div className={styles.tableTitle}>
		<span>
			Favorites{' '}
			<Badge
				count={totalRows}
				showZero
				overflowCount={99}
				title={`Found ${totalRows} results`}
				style={{
					backgroundColor: '#fff',
					color: '#999',
					boxShadow: '0 0 0 1px #d9d9d9 inset',
				}}
			/>
		</span>
	</div>
);

let columns = [
	{
		title: 'Row No.',
		dataIndex: 'key',
		key: 'key',
		width: 50,
	},
	{
		title: 'Bank',
		dataIndex: 'bank_name',
		key: 'bank_name',
		width: 120,
	},
	{
		title: 'IFSC',
		dataIndex: 'ifsc',
		key: 'ifsc',
		width: 70,
	},
	{
		title: 'Branch',
		dataIndex: 'branch',
		key: 'branch',
		width: 150,
	},
	{
		title: 'Bank ID',
		dataIndex: 'bank_id',
		key: 'bank_id',
		width: 50,
	},

	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
		width: 130,
	},
];

const modalMeta = {
	isVisible: false,
	currentShowing: {},
};

const FavoritesPage = () => {
	const { favoriteBanksData, removeFromFavorites } = useContext(BankContext);
	const [detailsForm] = Form.useForm();
	const [favoriteBanks] = favoriteBanksData;
	const [paginationOptions, setPaginationOptions] = useState(paginationMeta);
	const [currentPage, setCurrentPage] = useState(1);
	const [modalData, setModalData] = useState(modalMeta);

	const getColumns = () => {
		return [
			...columns,
			{
				title: 'Actions',
				key: 'actions',
				width: 100,
				render: (item) => (
					<Space key={item.id} size="middle">
						<Button size={'small'} onClick={() => toggleModal(item)}>
							View
						</Button>
						<Button
							size={'small'}
							danger
							onClick={() => removeFromFavorites(item.ifsc)}
						>
							<DeleteOutlined /> Remove
						</Button>
					</Space>
				),
			},
		];
	};

	const updateCurrentPage = ({ current, pageSize }) => {
		current && setCurrentPage(current);
		pageSize && setPaginationOptions((prev) => ({ ...prev, pageSize }));
	};

	const toggleModal = (item) => {
		setModalData((prev) => {
			if (prev.isVisible) {
				return modalMeta;
			}
			detailsForm.setFieldsValue({
				bankId: item.bank_id,
				address: item.address,
				city: item.city,
				district: item.district,
				state: item.state,
				ifsc: item.ifsc,
			});
			return {
				isVisible: true,
				currentShowing: item,
			};
		});
	};

	useEffect(() => {
		setPaginationOptions(paginationMeta);
		return () => {
			setCurrentPage(1);
			setPaginationOptions(paginationMeta);
		};
	}, []);

	return (
		<div className={styles.container}>
			<Table
				dataSource={favoriteBanks}
				columns={getColumns()}
				title={() => tableTitle(favoriteBanks.length)}
				bordered
				scroll={{ x: false, y: 350 }}
				pagination={{
					...paginationOptions,
					current: currentPage,
				}}
				onChange={updateCurrentPage}
			/>
			<Modal
				closable
				title="BANK DETAILS"
				visible={modalData.isVisible}
				onCancel={() => toggleModal()}
				onClose={() => toggleModal()}
				width={1100}
				centered
				destroyOnClose
				footer={null}
			>
				<Card style={{ minHeight: 200 }}>
					<DisplayForm form={detailsForm} initialValues={modalData.currentShowing} />
				</Card>
			</Modal>
		</div>
	);
};

export default FavoritesPage;
