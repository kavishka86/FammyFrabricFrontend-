import React from 'react';
import axios from 'axios';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import EmpLaout from '../Components/EmpLaout';
import { useSelector } from 'react-redux';

function CutOrderForm() {
    const { employee } = useSelector((state) => state.employee);
    console.log(employee);

    const navigate = useNavigate();
    const [form] = Form.useForm(); // Define form instance

    const onFinish = async (values) => {
        try {
            const response = await axios.post(
                '/api/new-orders/CutOrderForm',
                { ...values, employeeId: employee._id },
                {
                    headers: {
                        Authorization:
                            'Bearer ' + localStorage.getItem('tokens'),
                    },
                }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/display');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    return (
        <EmpLaout>
            <div className="cutform">
                <div className="form box">
                    <h3 className="ti">Add Order</h3>
                    <hr className="br"></hr>
                    <Form
                        className={'form1'}
                        layout="vertical"
                        form={form}
                        onFinish={onFinish}
                    >
                        <Row gutter={20}>
                            <Col span={8} xs={24} sm={24} lg={8}>
                                <div className="form-row">
                                    <div className="item">
                                        <Form.Item
                                            label="Order ID"
                                            name="orderId"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input Order ID!',
                                                },
                                                {
                                                    pattern: /^\d+$/,
                                                    message:
                                                        'Please enter a valid ID (only digits)!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Order ID" />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Col>

                            <Col span={8} xs={24} sm={24} lg={8}>
                                <div className="form-row">
                                    <div className="item">
                                        <Form.Item
                                            label="Name"
                                            name="name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input Name!',
                                                },
                                                {
                                                    pattern: /^[A-Za-z\s]+$/,
                                                    message:
                                                        'Please enter a valid name (only letters)!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Name" />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Col>

                            <Col span={8} xs={24} sm={24} lg={8}>
                                <div className="form-row">
                                    <div className="item">
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input Email!',
                                                },
                                                {
                                                    type: 'email',
                                                    message:
                                                        'Please enter a valid email address!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Email" />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Col>

                            <Col span={8} xs={24} sm={24} lg={8}>
                                <div className="form-row">
                                    <div className="item">
                                        <Form.Item
                                            label="Phone Number"
                                            name="phonenumber"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input Phone Number!',
                                                },
                                                {
                                                    pattern: /^\d{10}$/,
                                                    message:
                                                        'Please enter a valid 10-digit phone number!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Phone Number" />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Col>

                            <Col span={8} xs={24} sm={24} lg={8}>
                                <div className="form-row">
                                    <div className="item">
                                        <Form.Item
                                            label="Item"
                                            name="item"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input Item!',
                                                },
                                                {
                                                    pattern: /^[A-Za-z\s]+$/,
                                                    message:
                                                        'Please enter a valid item (only letters)!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Item" />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Col>

                            <Col span={8} xs={24} sm={24} lg={8}>
                                <div className="form-row">
                                    <div className="item">
                                        <Form.Item
                                            label="Measurements"
                                            name="measurements"
                                           
                                        >
                                            <Input placeholder="Measurements" />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Col>

                            <Col span={8} xs={24} sm={24} lg={8}>
                                <div className="form-row">
                                    <div className="item">
                                        <Form.Item
                                            label="Materials"
                                            name="materials"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input Materials!',
                                                },
                                                {
                                                    pattern: /^[A-Za-z\s]+$/,
                                                    message:
                                                        'Please enter valid materials (only letters)!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Materials" />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Col>

                            <Col span={8} xs={24} sm={24} lg={8}>
                                <div className="form-row">
                                    <div className="item">
                                        <Form.Item
                                            label="Order Total"
                                            name="orderTotal"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input Order Total!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                type="number"
                                                placeholder="Order Total"
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Col>

                            <Col span={8} xs={24} sm={24} lg={8}>
                                <div className="form-row">
                                    <div className="item">
                                        <Form.Item
                                            label="Date of Creation"
                                            name="dateOfCreation"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input Date of Creation!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                type="date"
                                                placeholder="Date of Creation"
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Col>

                            <Col span={8} xs={24} sm={24} lg={8}>
                                <div className="form-row">
                                    <div className="item">
                                        <Form.Item
                                            label="Date of Completion"
                                            name="dateOfCompletion"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input Date of Completion!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                type="date"
                                                placeholder="Date of Completion"
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Col>

                            <Col span={8} xs={24} sm={24} lg={8}>
                                <div className="form-row">
                                    <div className="item">
                                        <Form.Item
                                            label="Order Status"
                                            name="orderStatus"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please select Order Status!',
                                                },
                                            ]}
                                        >
                                            <Select>
                                                <Select.Option value="Cutting">
                                                    Cutting
                                                </Select.Option>
                                                <Select.Option value="Stitching">
                                                    Stitching
                                                </Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div className="Button-cons">
                            <Button
                                className="primary-button3 my-2"
                                htmlType="submit"
                            >
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </EmpLaout>
    );
}

export default CutOrderForm;
