import React, { } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import { message, Button, Form, Input } from 'antd';
import "./Payment.css";
import Layout from '../Components/Layout';

function CardDetails() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const location = useLocation();
    const amount = new URLSearchParams(location.search).get("amount");

    const handleNext = () => {
        navigate('/editCards');
    };

    const handleConfirm = async () => {
        try {
            const formValues = await form.validateFields();
            const queryParams = new URLSearchParams(location.search).toString();
            navigate(`/bill?${queryParams}`);
        } catch (error) {
            console.error('Error confirming card:', error);
            message.error('Error confirming card details. Please fill in all required fields correctly.');
        }
    };

    const handleSubmit = async () => {
        try {
            const formValues = await form.validateFields();
            const response = await axios.post('/api/card', formValues);
            console.log(response.data);
            message.success('Card details saved successfully.');
            form.resetFields();
        } catch (error) {
            console.error('Error creating card:', error);
            message.error('Error` saving card details. Please try again.');
        }
    };

    return (
        <Layout>
        <div className="background-card">
            <h2 className="text2">Add Card Details</h2>
            <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                    label="Cardholder Name"
                    name="cardholderName"
                    rules={[
                        { required: true, message: 'Please enter cardholder name' }, { pattern: /^[a-zA-Z\s]+$/, message: 'Please enter letters only' },
                        { max: 50, message: 'Cardholder name must be less than 50 characters.' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Card Number"
                    name="cardNumber"
                    rules={[
                        { required: true, message: 'Please enter card number.' },
                        { pattern: /^[0-9]{16}$/, message: 'Card number must be 16 digits.' },
                    ]}
                >
                    <Input type="text" />
                </Form.Item>
                <Form.Item
                    label="Expiration Month"
                    name="expireMonth"
                    rules={[
                        { required: true, message: 'Please enter expiration month.' },
                        { pattern: /^(0[1-9]|1[0-2])\/[0-9]{2}$/, message: 'Invalid expiration month format.' },
                    ]}
                >
                    <Input type="text" placeholder="MM/YY" />
                </Form.Item>
                <Form.Item
                    label="CVV"
                    name="cvv"
                    rules={[
                        { required: true, message: 'Please enter CVV.' },
                        { pattern: /^[0-9]{3,4}$/, message: 'CVV must be 3 or 4 digits.' },
                    ]}
                >
                    <Input type="text" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save Card
                    </Button>
                </Form.Item>
            </Form>

            <Button className="savedCards-btn" onClick={handleNext}>
                View Saved Cards
            </Button>

            <h3 className='text2'>Amount: {amount}</h3>

            <Button type="primary" onClick={handleConfirm}>Confirm Payment</Button>
        </div>

        </Layout>
    );
}

export default CardDetails;