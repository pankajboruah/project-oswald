import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {
	SearchOutlined,
	PlusOutlined,
	DeleteOutlined,
} from '@ant-design/icons';
import {
	Form,
	Table,
	Input,
	Select,
	Row,
	Col,
	Button,
	Space,
	Badge,
} from 'antd';
import Loader from 'sharedComponents/Loader';
import debounce from 'lodash/debounce';

import { BankContext } from 'contexts/BankContext';
import cities from 'constants/cities';
import categories from 'constants/categories';

import { getAllBanksForCity } from 'apis/bankData';

import styles from './index.module.scss';

const defaultFormFields = {
	city: 'GOA',
	category: null,
};

const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 18 },
};

const colLayout = {
	md: { span: 8 },
	className: 'gutter-row',
};

const paginationMeta = {
	defaultPageSize: 10,
	pageSize: 10,
	size: 'small',
	showSizeChanger: true,
};

const tableTitle = (totalRows) => (
	<div className={styles.tableTitle}>
		<span>
			Banks{' '}
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

const BanksListPage = () => {
	const navigate = useNavigate();
	const { bankData, addToFavorites, removeFromFavorites, isFavorite } =
		useContext(BankContext);
	const [form] = Form.useForm();
	// const [banks, setBanks] = useState([]);
	const [filteredBanks, setFilteredBanks] = useState([]);
	const [banks, setBanks] = bankData;
	const [isLoading, setIsLoading] = useState(false);
	const [paginationOptions, setPaginationOptions] = useState(paginationMeta);
	const [currentPage, setCurrentPage] = useState(1);
	const [showFilteredBanks, setShowFilteredBanks] = useState(false);

	const fetchBanks = (city) => {
		setIsLoading(true);
		getAllBanksForCity(city)
			.then((res) => {
				setBanks(
					res.map((el, idx) => ({
						...el,
						key: idx + 1,
						isFavorite: isFavorite(el.ifsc),
					})),
				);
				setPaginationOptions((prev) => ({
					...prev,
					total: res.length,
				}));
			})
			.catch((err) => {
				// eslint-disable-next-line no-console
				console.error(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const filterBanks = (query) => {
		setShowFilteredBanks(query && query.length > 0);
		let res = [...banks].filter((el) =>
			el[form.getFieldValue('category')]
				.toLowerCase()
				.includes(query.toLowerCase()),
		);
		setPaginationOptions((prev) => ({
			...prev,
			total: res.length,
		}));
		setFilteredBanks(res);
	};

	const debouncedFilterBanks = debounce((value) => {
		filterBanks(value);
	}, 500);

	const handleFavorite = (item) => {
		isFavorite(item.ifsc) ? removeFromFavorites(item.ifsc) : addToFavorites(item);
	};

	const getColumns = () => {
		return [
			...columns,
			{
				title: 'Actions',
				key: 'actions',
				width: 100,
				render: (item) => (
					<Space key={item.id} size="middle">
						<Button
							size={'small'}
							onClick={() => {
								navigate(`/bank-details/${item.ifsc}/`);
							}}
						>
							View
						</Button>
						<Button
							onClick={() => handleFavorite(item)}
							disabled={false}
							danger={isFavorite(item.ifsc)}
							size={'small'}
							style={{ width: 100 }}
						>
							{isFavorite(item.ifsc) ? (
								<>
									<DeleteOutlined /> Remove
								</>
							) : (
								<>
									<PlusOutlined /> Favorite
								</>
							)}
						</Button>
					</Space>
				),
			},
		];
	};

	const onFormValueChange = (formData) => {
		if ('city' in formData) {
			form.setFieldsValue({ query: null, category: null });
			setShowFilteredBanks(false);
			setFilteredBanks([]);
			setCurrentPage(1);
			fetchBanks(formData.city);
		} else if ('category' in formData) {
			if (!formData.category) {
				form.setFieldsValue({ query: null });
				setShowFilteredBanks(false);
				setFilteredBanks([]);
			}
		} else if ('query' in formData) {
			debouncedFilterBanks(formData.query);
		}
	};

	const updateCurrentPage = ({ current, pageSize }) => {
		current && setCurrentPage(current);
		pageSize && setPaginationOptions((prev) => ({ ...prev, pageSize }));
	};

	useEffect(() => {
		setPaginationOptions(paginationMeta);
		fetchBanks(form.getFieldValue('city'));
		return () => {
			setCurrentPage(1);
			setPaginationOptions(paginationMeta);
		};
	}, []);

	return (
		<div className={styles.container}>
			<Loader loading={isLoading} />
			<Form
				form={form}
				{...layout}
				layout={'horizontal'}
				initialValues={defaultFormFields}
				onValuesChange={onFormValueChange}
				autoComplete="off"
			>
				<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
					<Col {...colLayout}>
						<Form.Item name="city" label={'City'}>
							<Select
								showSearch
								placeholder="Select City"
								options={cities}
								optionFilterProp="label"
								filterOption
							/>
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item name="category" label={'Category'}>
							<Select
								showSearch
								placeholder="Choose Category"
								options={categories}
								optionFilterProp="label"
								filterOption
								allowClear
							/>
						</Form.Item>
					</Col>
					<Col {...colLayout}>
						<Form.Item
							shouldUpdate={(prevValues, curValues) =>
								prevValues.category !== curValues.category
							}
							noStyle
						>
							{({ getFieldValue }) => (
								<Form.Item name="query" label={'Query'}>
									<Input
										placeholder="Enter search query here..."
										allowClear
										prefix={<SearchOutlined style={{ color: '#cecece' }} />}
										disabled={getFieldValue('category') == null}
									/>
								</Form.Item>
							)}
						</Form.Item>
					</Col>
				</Row>
			</Form>
			<Table
				dataSource={showFilteredBanks ? filteredBanks : banks}
				columns={getColumns()}
				title={() =>
					tableTitle(showFilteredBanks ? filteredBanks.length : banks.length)
				}
				bordered
				scroll={{ x: false, y: 350 }}
				loading={isLoading}
				pagination={{
					...paginationOptions,
					current: currentPage,
				}}
				onChange={updateCurrentPage}
			/>
		</div>
	);
};

export default BanksListPage;
