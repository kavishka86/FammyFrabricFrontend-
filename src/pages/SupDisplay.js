import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, message, Modal, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../Sup.css';
import EmpLaout from '../Components/EmpLaout';

function SupDisplay() {
    const navigate = useNavigate();
    const [SupModel, setSupModel] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentSupModel, setCurrentSupModel] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchSupModel = async () => {
        try {
            const response = await axios.get('/api/SupRoute/getSupForm');
            const dataWithKey = response.data.bookings.map(item => ({ ...item, key: item._id }));
            setSupModel(dataWithKey);
        } catch (error) {
            console.error(error);
            message.error("Failed to fetch ");
        }
    };

    useEffect(() => {
        fetchSupModel();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/SupRoute/deletebooking/${id}`);
            setSupModel(prev => prev.filter(SupRoute => SupRoute._id !== id));
            message.success(' deleted successfully');
        } catch (error) {
            console.error('Failed to delete ', error);
            message.error('Failed to delete ');
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Material',
            dataIndex: 'mat',
            key: 'mat',
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quan',
            key: 'quan',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button className="supdate-button" type="primary" onClick={() => navigate(`/supdate/${record._id}`)}>Update</Button>
                    <Button className="delete-button" danger onClick={() => handleDelete(record._id)}>Delete</Button>
                </>
            ),
        },
    ];

    const showModal = (SupModel) => {
        setCurrentSupModel(SupModel);
        setIsModalVisible(true);
    };

    const handleUpdate = async (values) => {
        try {
            const response = await axios.put(`/api/SupRoute/updateSupForm/${currentSupModel._id}`, values);
            if (response.data.success) {
                message.success('updated successfully');
                setIsModalVisible(false);
                fetchSupModel();
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error('Failed to supdate ');
        }
    };

    // Filter data based on search query
    const filteredSupModel = SupModel.filter(item =>
        Object.values(item).some(val =>
            typeof val === 'string' && val.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const handleNewButtonClick = () => {
        navigate('/sform'); // Navigate to the sform route
    };

    const handleAddOrderButtonClick = () => {
        navigate('/sorders'); // Navigate toS the add order route
    };

    return (
        <EmpLaout>
        <div className="table-container">
            <Input.Search
                placeholder="Search"
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: '16px' }}
            />
            <div className="table-wrapper">
                <div>
                    <Table dataSource={filteredSupModel} columns={columns} />
                    <Modal
                        title="Update Booking"
                        open={isModalVisible}
                        onCancel={() => setIsModalVisible(false)}
                        footer={null}
                    >
                        <Form
                            layout="vertical"
                            initialValues={{ ...currentSupModel }}
                            onFinish={handleUpdate}
                        >
                            <Form.Item
                                name="ID"
                                label="ID"
                                rules={[{ message: 'Please input the Supplier Name!' }]}
                            >
                                <Input />
                            </Form.Item>
                            {/* Repeat for other fields as necessary */}
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Update
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Button type="primary" onClick={handleNewButtonClick}>
                        New
                    </Button>
                    <Button  className="order" type="primary" onClick={handleAddOrderButtonClick}>
                         Order
                    </Button>
                </div>
            </div>
        </div>
        </EmpLaout>
    );
}

export default SupDisplay;
