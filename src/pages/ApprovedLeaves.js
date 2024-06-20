import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { message, Modal, Form, Input } from 'antd';
import { useReactToPrint } from 'react-to-print';
import EmpLaout from '../Components/EmpLaout';


function ApprovedLeaves() {



    const [ApprovedLeaveModel, setApprovedLeaveModel] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentApprovedLeaveModel, setCurrentApprovedLeaveModel] = useState(null);

    const fetchApprovedLeaveModel = async () => {
        try {
            const response = await axios.get('/api/leave/getempLeaveList');
            const dataWithKey = response.data.approvedBookings.map(item => ({ ...item, key: item._id })); // Adjust according to your data structure
            setApprovedLeaveModel(dataWithKey);
        } catch (error) {
            console.error(error);
            message.error("Failed to fetch ");
        }
    };


    useEffect(() => {
        fetchApprovedLeaveModel();
    }, []);

    return (
        <EmpLaout>
        
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Requested At</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {ApprovedLeaveModel.map(item => (
                        <tr key={item.key}>
                            <td>{item.employeeId}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.requestAt}</td>
                            <td>{item.reason}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
       
            </EmpLaout>

    )
}

export default ApprovedLeaves;
