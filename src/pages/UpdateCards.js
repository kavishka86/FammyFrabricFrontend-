import React from 'react';
import axios from 'axios';
import { Button, Col, Form, Input, Row } from 'antd';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../Components/Layout'; // Import your layout component

function UpdateCards() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();

  

  const onFinish = async (values) => {
    const updatedValues = {
      ...values
    };

    try {
      const response = await axios.patch(`/api/card/${id}`, updatedValues);
      if (response.data.success) {
        navigate('/editCards');
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to update card details!');
    }
  };

  return (
    <Layout>
      <div className="form-container">
        <h2 className='text2'>Update Card Details</h2>
        <hr className='br'></hr>
        <Form className='form-container' layout='vertical' form={form} onFinish={onFinish}>
          <Row gutter={20}>
            <Col span={8} xs={24} sm={24} lg={8}>
              <div className="form-row">
                <div className="item">
                  <Form.Item label='Cardholder Name' 
                  name='cardholderName'
                  rules={[{ required: true, message: 'Please enter cardholder name' }, { pattern: /^[a-zA-Z\s]+$/, message: 'Please enter letters only' }]}
                  >
                    <Input placeholder='Cardholder Name' />
                  </Form.Item>
                </div>
              </div>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <div className="form-row">
                <div className="item">
                  <Form.Item label='Card Number'
                  name='cardNumber'
                  rules={[
                    { required: true, message: 'Please enter card number.' },
                    { pattern: /^[0-9]{16}$/, message: 'Card number must be 16 digits.' },
                ]}
                  >
                    <Input placeholder='Card Number' />
                  </Form.Item>
                </div>
              </div>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <div className="form-row">
                <div className="item">
                  <Form.Item label='Expiration Month'
                  name='expireMonth'
                  rules={[
                    { required: true, message: 'Please enter expiration month.' },
                    { pattern: /^(0[1-9]|1[0-2])\/[0-9]{2}$/, message: 'Invalid expiration month format.' },
                ]}
                  >
                    <Input placeholder='Expiration Month' />
                  </Form.Item>
                </div>
              </div>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <div className="form-row">
                <div className="item">
                  <Form.Item label='CVV' 
                  name='cvv'
                  rules={[
                    { required: true, message: 'Please enter CVV.' },
                    { pattern: /^[0-9]{3,4}$/, message: 'CVV must be 3 or 4 digits.' },
                ]}
                  >
                    <Input placeholder='CVV' />
                  </Form.Item>
                </div>
              </div>
            </Col>
          </Row>
          <div className="Button-cons">
            <Button className='primary-button3 my-2' htmlType='submit' >Update Card</Button>
          </div>
        </Form>
      </div>
    </Layout>
  );
}

export default UpdateCards;