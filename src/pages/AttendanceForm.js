import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';
import EmpLaout from '../Components/EmpLaout';


const { Option } = Select;

const AttendanceForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.get('/api/attendance', values);
            if (response.status === 201) {
                message.success('Attendance record created successfully');
                form.resetFields();
            }
        } catch (error) {
            console.error('Error creating attendance record:', error);
            message.error('Failed to create attendance record');
        } finally {
            setLoading(false);
        }
    };

    // Custom validator for the hoursWorked field
    const validateHoursWorked = (rule, value) => {
        if (isNaN(value)) {
            return Promise.reject('Please enter a valid number');
        }
        const floatValue = parseFloat(value);
        if (floatValue < 0 || floatValue > 24) {
            return Promise.reject('Hours worked must be between 0 and 24');
        }
        return Promise.resolve();
    };

    return (
        <EmpLaout>
      
        <div className="attendance-form-container"> {/* Apply class to form container */}
        <div className="attendance-form"> {/* Apply class to form */}
            <Form form={form} onFinish={onFinish}>
                <Form.Item className="employeeId" name="employeeId" label="Employee ID" rules={[{ required: true, message: 'Please enter employee ID' }]}>
                    <Input />
                </Form.Item>
                <Form.Item className="date" name="date" label="Date" rules={[{ required: true, message: 'Please select date' }]}>
                    <Input type="date" />
                </Form.Item>
                <Form.Item className="status" name="status" label="Status" rules={[{ required: true, message: 'Please select status' }]}>
                    <Select>
                        <Option value="Present">Present</Option>
                        <Option value="Absent">Absent</Option>
                        <Option value="Late">Late</Option>
                    </Select>
                </Form.Item>
                <Form.Item className="hoursWorked" name="hoursWorked" label="Hours Worked" rules={[
                    { required: true, message: 'Please enter worked hours' },
                    { validator: validateHoursWorked }
                ]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>Submit</Button>
                </Form.Item>
            </Form>
        </div>
    </div>
    </EmpLaout>
        
    );
};

export default AttendanceForm;
