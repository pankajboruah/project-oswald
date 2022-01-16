import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, PageHeader, Button, Form, Row, Col, Input, message } from 'antd';
import {
	ArrowLeftOutlined,
	PlusOutlined,
	DeleteOutlined,
} from '@ant-design/icons';

import { BankContext } from 'contexts/BankContext';

import styles from './index.module.scss';

const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 18 },
};

const colLayout = {
	md: { span: 12 },
	className: 'gutter-row',
};

const BankDetailsPage = () => {
	const navigate = useNavigate();
	const [bankDetailsForm] = Form.useForm();
	const { getBankDetails, addToFavorites, removeFromFavorites, isFavorite } =
		useContext(BankContext);
	const [bankDetails, setBankDetails] = useState({});
	const [toggleFavorite, setToggleFavorite] = useState(false);

	const ifsc = useParams().ifsc_code;

	const onBackClicked = () => {
		navigate(`/all-banks`);
	};

	const handleFavorite = () => {
		toggleFavorite ? removeFromFavorites(ifsc) : addToFavorites(bankDetails);
		setToggleFavorite(!toggleFavorite);
	};

	useEffect(() => {
		let data = getBankDetails(ifsc);
		if (!data) {
			message.error('Could not fetch bank details. Redirecting to listing page.');
			navigate(`/all-banks`);
			return;
		}
		setToggleFavorite(isFavorite(ifsc));
		setBankDetails(data);
		bankDetailsForm.setFieldsValue({
			bankId: data.bank_id,
			address: data.address,
			city: data.city,
			district: data.district,
			state: data.state,
			ifsc: data.ifsc,
		});
	}, []);

	return (
		<Card
			title={
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<PageHeader
						title={' '}
						backIcon={
							<div className={styles.backButton}>
								<ArrowLeftOutlined /> Back to List
							</div>
						}
						style={{ padding: 0 }}
						onBack={() => onBackClicked()}
					/>
					<div className={styles.titleContainer}>
						<div className={styles.title}>{bankDetails.bank_name}</div>
						<div className={styles.subtitle}>{bankDetails.branch}</div>
					</div>
					<div style={{ display: 'flex' }}>
						{
							<Button
								onClick={() => handleFavorite()}
								disabled={false}
								danger={toggleFavorite}
								style={{ width: 200 }}
							>
								{toggleFavorite ? (
									<>
										<DeleteOutlined /> Remove From Favorites
									</>
								) : (
									<>
										<PlusOutlined /> Add To Favorites
									</>
								)}
							</Button>
						}
					</div>
				</div>
			}
			bordered={false}
			style={{ minHeight: 400 }}
			bodyStyle={{ backgroundColor: '#F7F8FA' }}
		>
			<Card style={{ minHeight: 400 }} title="BANK DETAILS">
				<Form
					form={bankDetailsForm}
					{...layout}
					layout={'horizontal'}
					initialValues={bankDetails}
					autoComplete="off"
				>
					<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
						<Col {...colLayout}>
							<Form.Item name="bankId" label={'Bank ID'}>
								<Input style={{ width: '70%' }} allowClear disabled />
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item name="address" label={'Address'}>
								<Input style={{ width: '70%' }} allowClear disabled />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
						<Col {...colLayout}>
							<Form.Item name="city" label={'City'}>
								<Input style={{ width: '70%' }} allowClear disabled />
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item name="district" label={'District'}>
								<Input style={{ width: '70%' }} allowClear disabled />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
						<Col {...colLayout}>
							<Form.Item name="state" label={'State'}>
								<Input style={{ width: '70%' }} allowClear disabled />
							</Form.Item>
						</Col>
						<Col {...colLayout}>
							<Form.Item name="ifsc" label={'IFSC Code'}>
								<Input style={{ width: '70%' }} allowClear disabled />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Card>
		</Card>
	);
};

export default BankDetailsPage;
