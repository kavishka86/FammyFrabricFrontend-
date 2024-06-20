import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { message} from 'antd';
import EmpLaout from '../Components/EmpLaout';


function RejectedLeaves() {

    const [RejectedLeaveModel, setRejectedLeaveModel] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentRejectedLeaveModel, setCurrentRejectedLeaveModel] = useState(null);

    const fetchRejectedLeaveModel = async () => {
        try {
            const response = await axios.get('/api/leave/getempLeaveList');
            const dataWithKey = response.data.rejectedBookings.map(item => ({ ...item, key: item._id })); // Adjust according to your data structure
            setRejectedLeaveModel(dataWithKey); // Use response.data.rejectedBookings
        } catch (error) {
            console.error(error);
            message.error("Failed to fetch ");
        }
    };

    useEffect(() => {
        fetchRejectedLeaveModel();
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
                    {RejectedLeaveModel.map(item => (
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

export default RejectedLeaves;
