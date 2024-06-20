import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, message, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import EmpLaout from '../Components/EmpLaout';
import { useSelector } from 'react-redux';

const { Search } = Input;

function CutOrderDetails() {
    const { employee } = useSelector((state) => state.employee);
    const navigate = useNavigate();

    const nav = () => {
        navigate('/tailororder');
    };

    const [cutOrderModel, setCutOrderModel] = useState([]);
    const [searchText, setSearchText] = useState('');

    const fetchCutOrderModel = async () => {
        try {
            const response = await axios.post(
                '/api/new-orders/getCutOrderForm',
                { employeeId: employee._id },
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('tokens'),
                    },
                }
            );
            const dataWithKey = response.data.bookings.map((item) => ({
                ...item,
                key: item._id,
            }));
            setCutOrderModel(dataWithKey);
        } catch (error) {
            console.error(error);
            message.error('Failed to fetch ');
        }
    };

    useEffect(() => {
        fetchCutOrderModel();
    }, [employee]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/new-orders/deletebooking/${id}`);
            setCutOrderModel((prev) =>
                prev.filter((cutOrder) => cutOrder.id !== id)
            );
            message.success('Deleted successfully');
            fetchCutOrderModel();
        } catch (error) {
            console.error('Failed to delete ', error);
            message.error('Failed to delete ');
        }
    };

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const filteredData = cutOrderModel.filter((cutOrder) =>
        cutOrder.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phonenumber',
            key: 'phonenumber',
        },
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
        },
        {
            title: 'Measurements',
            dataIndex: 'measurements',
            key: 'measurements',
        },
        {
            title: 'Materials',
            dataIndex: 'materials',
            key: 'materials',
        },
        {
            title: 'Order Total',
            dataIndex: 'orderTotal',
            key: 'orderTotal',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button
                        type="primary"
                        className="update"
                        onClick={() => navigate(`/update/${record._id}`)}
                    >
                        Update
                    </Button>
                    <Button danger onClick={() => handleDelete(record._id)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <EmpLaout>
            <h3 className="title">Order Details</h3>
                <hr className="break-line"></hr>
            <div className="wrapper  ">
                
                <div className="content">
                    <Search
                        placeholder="Search by name"
                        allowClear
                        onSearch={handleSearch}
                        style={{ width: 400,height: 40, marginBottom: 16 }}
                    />
                    <Table
                        dataSource={filteredData}
                        columns={columns}
                        className="table-wrapper"
                        pagination={{ pageSize: 4 }}
                    />
                    <div className="button-container" onClick={nav}>
                        <Button className="primary-button my-2">Add Order</Button>
                    </div>
                </div>
            </div>
        </EmpLaout>
    );
}

export default CutOrderDetails;
