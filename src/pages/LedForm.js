import React from 'react';
import axios from 'axios';
import { Button, Col, Form, Input, Row } from 'antd';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import EmpLaout from '../Components/EmpLaout';
import { useSelector } from 'react-redux';

function LedForm() {
    const navigate = useNavigate();
    const { employee } = useSelector((state) => state.employee);
    const [form] = Form.useForm(); // Define form instance

    const onFinish = async (values) => {
        console.log('Received values of form', values);

        try {
            const response = await axios.post('/api/LedFinacialRoutes/LedForm', { ...values, employeeId: employee._id }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('tokens')
                }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/leddisplay');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <EmpLaout>
            <div className="Ledform">
                <div className="form box p-3">
                    <h3 className='ti'>Add Report Details</h3>
                    <Form layout='vertical' form={form} onFinish={onFinish}>
                        <Row gutter={20}>
                            <Col span={8} xs={24} sm={24} lg={8}>
                                <div className="form-row">
                                    <div className="item">
                                        <Form.Item
                                            label='ID'
                                            name='id'
                                            rules={[
                                                { required: true, message: 'Please input ID' },
                                                { pattern: /^[0-9]*$/, message: 'Please enter a valid number' }
                                            ]}
                                        >
                                            <Input placeholder='ID' />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Col>
                            <Col span={8} xs={24} sm={24} lg={8}>
                                <div className="form-row">
                                    <div className="item">
                                        <Form.Item
                                            label='Month'
                                            name='month'
                                            rules={[{ required: true, message: 'Please input Month' }]}
                                        >
                                            <Input placeholder='Month' />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Col>
                            <Col span={8} xs={24} sm={24} lg={8}>
                                <div className="form-row">
                                    <div className="item">
                                        <Form.Item
                                            label='Monthly Income'
                                            name='income'
                                            rules={[
                                                { required: true, message: 'Please input Monthly Income' },
                                                { pattern: /^[0-9]*$/, message: 'Please enter a valid number' }
                                            ]}
                                        >
                                            <Input placeholder='Monthly Income' />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Col>
                            <Col span={8} xs={24} sm={24} lg={8}>
                                <div className="form-row">
                                    <div className="item">
                                        <Form.Item
                                            label='Monthly Employee Salary'
                                            name='salary'
                                            rules={[
                                                { required: true, message: 'Please input Monthly Employee Salary' },
                                                { pattern: /^[0-9]*$/, message: 'Please enter a valid number' }
                                            ]}
                                        >
                                            <Input placeholder='Monthly Employee Salary' />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Col>
                            <Col span={8} xs={24} sm={24} lg={8}>
                                <div className="form-row">
                                    <div className="item">
                                        <Form.Item
                                            label='Monthly Material Cost'
                                            name='cost'
                                            rules={[
                                                { required: true, message: 'Please input Monthly Material Cost' },
                                                { pattern: /^[0-9]*$/, message: 'Please enter a valid number' }
                                            ]}
                                        >
                                            <Input placeholder='Monthly Material Cost' />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Col>
                            <Col span={8} xs={24} sm={24} lg={8}>
                                <div className="form-row">
                                    <div className="item">
                                        <Form.Item
                                            label='Other Cost'
                                            name='other'
                                            rules={[
                                                { required: true, message: 'Please input Other Cost' },
                                                { pattern: /^[0-9]*$/, message: 'Please enter a valid number' }
                                            ]}
                                        >
                                            <Input placeholder='Other Cost' />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div className="Button-cons">
                            <Button className='primary-button my-2' htmlType='submit'>Submit</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </EmpLaout>
    );
}

export default LedForm;