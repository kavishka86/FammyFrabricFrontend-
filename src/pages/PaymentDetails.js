import React, { } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message, Form, Input, Button } from 'antd'; 
import "./Payment.css";
import Layout from '../Components/Layout';

const PaymentDetails = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post('/api/payment', formData);
      console.log(response.data);
      message.success('Details Entered successfully');
      navigate(`/cardDetails?${new URLSearchParams(formData).toString()}`);
    } catch (error) {
      console.error('Error Entering details: ', error);
      message.error('Error Entering details');
    }
  };

  return (


    <Layout>
    <div className="form-container">
      <h2 className="text1">Make Your Payment</h2>
      <hr></hr>
      <Form onFinish={handleSubmit}
      initialValues={{
        fullName: '',
        address: '',
        city: '',
        zip: '',
        country: '',
        amount: '',
      }}
      >
        <h1 className="text2">Personal Information</h1>

        <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              { required: true, message: 'Please enter your full name' },
              { pattern: /^[a-zA-Z ]+$/, message: 'Please enter letters and spaces only' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please enter your address' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: 'Please enter your city' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="ZIP Code"
            name="zip"
            rules={[{ required: true, message: 'Please enter your ZIP code' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: 'Please enter your country' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Amount (Rs.)"
            name="amount"
            rules={[
              { required: true, message: 'Please enter amoount' },
              { pattern: /^[0-9]*$/, message: 'Please enter a valid number' }
              ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item>
            <div className="button-container">
              <Button type="primary" htmlType="submit">
                NEXT
              </Button>
            </div>
          </Form.Item>
      </Form>

    </div>
    </Layout>

  );
};

export default PaymentDetails;
