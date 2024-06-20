import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, message, Modal, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import './EmpEmployees.css';
import EmpLaout from '../Components/EmpLaout';

function EmpEmployees() {
    const navigate = useNavigate();

    const [employeeModel, setEmployeeModel] = useState([]);
    const [filteredEmployeeModel, setFilteredEmployeeModel] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentEmployeeModel, setCurrentEmployeeModel] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchEmployeeModel = async () => {
        try {
            const response = await axios.get('/api/employee/getempregister');
            const dataWithKey = response.data.employee.map(item => ({ ...item, key: item._id }));
            setEmployeeModel(dataWithKey);
            setFilteredEmployeeModel(dataWithKey);
        } catch (error) {
            console.error(error);
            message.error("Failed to fetch employees");
        }
    };

    useEffect(() => {
        fetchEmployeeModel();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/employee/deletebooking/${id}`);
            setEmployeeModel(prevEmployees => prevEmployees.filter(employee => employee._id !== id));
            setFilteredEmployeeModel(prevEmployees => prevEmployees.filter(employee => employee._id !== id));
            message.success('Employee deleted successfully');
        } catch (error) {
            console.error('Failed to delete employee:', error);
            message.error('Failed to delete employee');
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        const filteredData = employeeModel.filter(employee => employee.empemployeeType.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredEmployeeModel(filteredData);
    };

    const handleUpdate = async (values) => {
        try {
            const response = await axios.put(`/api/employee/updateEmpRegister/${currentEmployeeModel._id}`, values);
            if (response.data.success) {
                message.success('Employee details updated successfully');
                setIsModalVisible(false);
                fetchEmployeeModel();
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            console.error('Failed to update employee details:', error);
            message.error('Failed to update employee details');
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'empname',
            key: 'empname',
        },
        {
            title: 'Email',
            dataIndex: 'empemail',
            key: 'empemail',
        },
        {
            title: 'Employee Type',
            dataIndex: 'empemployeeType',
            key: 'empemployeeType',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button type="primary" className="update" onClick={() => navigate(`/empDetailsUpdate/${record._id}`)}>Update</Button>
                    <Button danger onClick={() => handleDelete(record._id)}>Delete</Button>
                </>
            ),
        },
    ];

    return (
        <EmpLaout>
            <div className="background">
                <Input
                    placeholder="Search by Employee Type"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ marginBottom: '1rem', width: '300px' }}
                />
                
                <Table dataSource={filteredEmployeeModel} columns={columns} />
                <Modal
                    title="Update Employees"
                    visible={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={null}
                >
                    <Form
                        layout="vertical"
                        initialValues={{ ...currentEmployeeModel }}
                        onFinish={handleUpdate}
                    >
                        <Form.Item
                            name="empname"
                            label="Name"
                            rules={[{ required: true, message: 'Please input the Employee Name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form>
                </Modal>

                <Button type="primary" onClick={() => navigate('/EmpRegister')}>Add Employee</Button>
            </div>
        </EmpLaout>
    );
}

export default EmpEmployees;
