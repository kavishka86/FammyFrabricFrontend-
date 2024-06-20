import React, { useEffect } from 'react';
import axios from 'axios';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import EmpLaout from '../Components/EmpLaout';

function CutOrderUpdate() {
    const navigate = useNavigate();
    const { id } = useParams(); // Assuming you're using react-router-dom v5 or v6
    const [form] = Form.useForm();

    // Helper function to format date string
    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toISOString().slice(0, 10);
    };

    useEffect(() => {
        const fetchCutOrderModel = async () => {
            try {
                const response = await axios.get(
                    `/api/new-orders/getCutOrderForm2/${id}`
                );
                if (response.data.success) {
                    const data = response.data.bookings;
                    form.setFieldsValue({
                        orderId: data.orderId,
                        name: data.name,
                        email: data.email,
                        phonenumber: data.phonenumber,
                        item: data.item,
                        measurements: data.measurements,
                        materials: data.materials,
                        orderTotal: data.orderTotal,
                        dateOfCreation: formatDate(data.dateOfCreation),
                        dateOfCompletion: formatDate(data.dateOfCompletion),
                        orderStatus: data.orderStatus,
                    });
                } else {
                    toast.error('not found!');
                    navigate('/display');
                }
            } catch (error) {
                toast.error('Failed to fetch data!');
            }
        };

        fetchCutOrderModel();
    }, [id, form, navigate]);

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        const updatedValues = {
            ...values,
        };

        try {
            const response = await axios.put(
                `/api/new-orders/updateCutOrderForm/${id}`,
                updatedValues
            );
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/Display');
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
                    <h3 className="ti">Update Form</h3>
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
                                        >
                                            <Input placeholder="Order ID" />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Col>

                            <Col span={8} xs={24} sm={24} lg={8}>
                                <div className="form-row">
                                    <div className="item">
                                        <Form.Item label="Name" name="name">
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
                                        >
                                            <Input placeholder="Address" />
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
                                        >
                                            <Input placeholder="Phone Number" />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Col>

                            <Col span={8} xs={24} sm={24} lg={8}>
                                <div className="form-row">
                                    <div className="item">
                                        <Form.Item label="Item" name="item">
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
                                htmlType="Add Orders"
                            >
                                Update
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </EmpLaout>
    );
}

export default CutOrderUpdate;
