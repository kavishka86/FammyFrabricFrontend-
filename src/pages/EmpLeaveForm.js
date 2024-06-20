import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import axios from 'axios';
import './EmpLeaveForm.css'; // Import CSS file
import { useSelector } from 'react-redux';
import EmpLaout from '../Components/EmpLaout';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function EmpLeaveForm() {
    const navigate = useNavigate(); // Move useNavigate inside the component

    const nav1 = () => {
        navigate('/ApprovedLeaves');
    }

    const nav2 = () => {
        navigate('/RejectedLeaves');
    }

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { employee } = useSelector((state) => state.employee);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post("/api/leave/leaveHRsup", { ...values, employeeId: employee._id }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('tokens')
                }
            });
            if (response.data.success) {
                message.success('Leave submitted successfully');
                form.resetFields();
            } else {
                message.error('Failed to submit leave');
            }
        } catch (error) {
            console.error('Error submitting leave:', error);
            message.error('Failed to submit leave');
        }
        setLoading(false);
    };

    return (
        <EmpLaout>
            <h3 className='ti p-2'>Leave Form</h3>
            <hr className='br'></hr>
            <br></br>
         
     
            <div className="leave-form-container">
                
                <div className="leave-form">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="eId"
                            label="EmployeeId"
                            rules={[{ required: true, message: 'Please enter your Employee ID' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please enter your name' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Please enter your email' },
                                { type: 'email', message: 'Please enter a valid email' }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="requestAt"
                            label="Requested At"
                            rules={[{ required: true, message: 'Please select requested date' }]}
                        >
                            <DatePicker />
                        </Form.Item>

                        <Form.Item
                            name="department"
                            label="Department"
                            rules={[{ required: true, message: 'Please select your department' }]}
                        >
                            <Select>
                                <Option value="Management">Management</Option>
                                <Option value="Sales Associate">Sales Associate</Option>
                                <Option value="Finance">Finance</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="reason"
                            label="Description/Reason"
                            rules={[{ required: true, message: 'Please enter a description' }]}
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Submit
                            </Button>
                            <div className="Button-cons" onClick={nav1}>
                                <Button className='primary-button my-2' htmlType='submit'>Approved Leaves</Button>
                            </div>
                            <div className="Button-cons" onClick={nav2}>
                                <Button className='primary-button my-2' htmlType='submit'>Rejected Leaves</Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </EmpLaout>
    );
}

export default EmpLeaveForm;
