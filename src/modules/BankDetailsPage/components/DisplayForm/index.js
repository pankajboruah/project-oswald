import React from 'react';
import PropTypes from 'prop-types';

import { Form, Row, Col, Input } from 'antd';

const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 18 },
};

const colLayout = {
	md: { span: 12 },
	className: 'gutter-row',
};

const DisplayForm = ({ form, initialValues }) => {
	return (
		<Form
			form={form}
			{...layout}
			layout={'horizontal'}
			initialValues={initialValues}
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
	);
};

DisplayForm.propTypes = {
	form: PropTypes.object.isRequired,
	initialValues: PropTypes.object.isRequired,
};

export default DisplayForm;
