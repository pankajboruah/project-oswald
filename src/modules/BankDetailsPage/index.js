import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, PageHeader, Button, Form, message } from 'antd';
import {
	ArrowLeftOutlined,
	PlusOutlined,
	DeleteOutlined,
} from '@ant-design/icons';

import { BankContext } from 'contexts/BankContext';
import DisplayForm from './components/DisplayForm';

import styles from './index.module.scss';

const BankDetailsPage = () => {
	const navigate = useNavigate();
	const [bankDetailsForm] = Form.useForm();
	const { getBankDetails, addToFavorites, removeFromFavorites, isFavorite } =
		useContext(BankContext);
	const [bankDetails, setBankDetails] = useState({});

	const ifsc = useParams().ifsc_code;

	const onBackClicked = () => {
		navigate(`/all-banks`);
	};

	const handleFavorite = () => {
		isFavorite(ifsc) ? removeFromFavorites(ifsc) : addToFavorites(bankDetails);
	};

	useEffect(() => {
		let data = getBankDetails(ifsc);
		if (!data) {
			message.error('Could not fetch bank details. Redirecting to listing page.');
			navigate(`/all-banks`);
			return;
		}
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
								danger={isFavorite(ifsc)}
								style={{ width: 200 }}
							>
								{isFavorite(ifsc) ? (
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
				<DisplayForm form={bankDetailsForm} initialValues={bankDetails} />
			</Card>
		</Card>
	);
};

export default BankDetailsPage;
