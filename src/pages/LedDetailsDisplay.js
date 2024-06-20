import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, message, Modal, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import EmpLaout from '../Components/EmpLaout';
import { useSelector } from 'react-redux';

function LedForm() {
    const navigate = useNavigate();
    const { employee } = useSelector((state) => state.employee);
    console.log(employee);

    const nav = () => {
        // Navigate to the driver registers page
        navigate('/ledreport');
    }

    const [LedFinancial, setLedFinancial] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentLedFinancial, setCurrentLedFinancial] = useState(null);

    const fetchLedFinancial = async () => {
        try {
            const response = await axios.post('/api/LedFinacialRoutes/getLedForm', { employeeId: employee._id }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('tokens')
                }
            });
            const dataWithKey = response.data.bookings.map(item => ({ ...item, key: item._id }));
            setLedFinancial(dataWithKey);
        } catch (error) {
            console.error(error);
            message.error("Failed to fetch ");
        }
    };

    useEffect(() => {
        fetchLedFinancial();
    }, [employee]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/LedFinacialRoutes/deletebooking/${id}`);
            setLedFinancial(prev => prev.filter(ledFinancial => ledFinancial.id !== id));
            message.success(' deleted successfully');
            fetchLedFinancial();
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
            title: 'Month',
            dataIndex: 'month',
            key: 'month',
        },
        {
            title: 'Monthly Income',
            dataIndex: 'income',
            key: 'income',
        },
        {
            title: 'Monthly Employee Salary',
            dataIndex: 'salary',
            key: 'salary',
        },
        {
            title: 'Monthly Material cost',
            dataIndex: 'cost',
            key: 'cost',
        },
        {
            title: 'Other cost',
            dataIndex: 'other',
            key: 'other',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button type="primary" className="update" onClick={() => navigate(`/ledupdate/${record._id}`)}>Update</Button>
                    <Button danger onClick={() => handleDelete(record._id)}>Delete</Button>
                </>
            ),
        },
    ];

    const showModal = (ledFinancial) => {
        setCurrentLedFinancial(ledFinancial);
        setIsModalVisible(true);
    };

    const handleUpdate = async (values) => {
        try {
            const response = await axios.put(`/api/LedFinancialRoute/updateLedForm/${currentLedFinancial._id}`, values);
            if (response.data.success) {
                message.success('updated successfully');
                setIsModalVisible(false);
                fetchLedFinancial();
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error('Failed to update ');
        }
    };

    return (
        <EmpLaout>
        <div className='wrapp'>
            <div className='na'>
                <Table
                    dataSource={LedFinancial}
                    columns={columns}
                    className="table-wrapper"
                    pagination={{ pageSize: 5 }}
                />
                <div>
                    <div className="Button-cons" onClick={nav}>
                        <Button className='primary-button my-2' htmlType='submit'>Generate Report</Button>
                    </div>
                </div>
            </div>
        </div>
    </EmpLaout>
    
    );
}

export default LedForm;
