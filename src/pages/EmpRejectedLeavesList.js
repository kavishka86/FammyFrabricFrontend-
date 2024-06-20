// EmpRejectedLeavesList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import EmpLaout from '../Components/EmpLaout';

function EmpRejectedLeavesList() {
    const [rejectedLeaves, setRejectedLeaves] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("/api/leave/rejectedLeaves");
                if (response.data.success) {
                    setRejectedLeaves(response.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch rejected leaves:', error);
            }
        }
        fetchData();
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Requested At',
            dataIndex: 'requestAt',
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
        }
    ];

    return (
        <EmpLaout>
            <div>
                <h1 className="page-header">Rejected Leaves List</h1>
                <Table columns={columns} dataSource={rejectedLeaves} />
            </div>
        </EmpLaout>

    );
}

export default EmpRejectedLeavesList;
