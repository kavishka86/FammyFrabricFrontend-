import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../Redux/EmpSlice.js';
import axios from 'axios';
import { Button, Table, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import EmpLaout from '../Components/EmpLaout.js';

function EmpLeaveList() {
    const [leaves, setLeaves] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getLeavesData = async () => {
        try {
            // dispatch(showLoading());
            const response = await axios.get("/api/leave/leaveHRsup", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("tokens")}`
                }
            });
            // dispatch(hideLoading());
            if (response.data.success) {
                setLeaves(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch leave data:', error);
            // dispatch(hideLoading());
        }
    };

    const handleApprove = async (leaveId) => {
        try {
            const response = await axios.put(`/api/leave/approveLeave/${leaveId}`);
            if (response.data.success) {
                message.success('Leave request approved successfully');
                // Optionally, you can fetch the updated list of leaves after approval
                getLeavesData();
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            console.error('Failed to approve leave request:', error);
            message.error('Failed to approve leave request');
        }
    };

    const handleReject = async (leaveId) => {
        try {
            const response = await axios.put(`/api/leave/rejectLeave/${leaveId}`);
            if (response.data.success) {
                message.success('Leave request rejected successfully');
                // Optionally, you can fetch the updated list of leaves after rejection
                getLeavesData();
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            console.error('Failed to reject leave request:', error);
            message.error('Failed to reject leave request');
        }
    };


    useEffect(() => {
        getLeavesData();
    }, []);

    const columns = [
        
        {
            title: 'EmployeeId',
            dataIndex: 'eId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Date Of Leave Request',
            dataIndex: 'requestAt',
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex'>
                    <Button className='update' onClick={() => handleApprove(record._id)}>Approve</Button>
                    <Button className='delete' onClick={() => handleReject(record._id)}>Reject</Button>
                </div>
            )
        }
    ];

    return (
        <EmpLaout>
        <div>
    
            <h1 className="page-header">Leaves List</h1>
            <Table columns={columns} dataSource={leaves} />

            <div style={{ marginBottom: '16px' }}>
                <Button type="primary" onClick={() => navigate('/EmpLeaveForm')}>Add Leave</Button>
                <Button onClick={() => navigate('/ApprovedLeaves')} style={{ marginLeft: '16px' }}>View Approved Leaves</Button>
                <Button onClick={() => navigate('/RejectedLeaves')} style={{ marginLeft: '16px' }}>View Rejected Leaves</Button>
            </div>
            </div>
            </EmpLaout>
     
    );
}

export default EmpLeaveList;

