import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd';
// import Layout from '../EmpComponents/EmpLayout.js';

const WorkingHours = () => {
    const [workingHours, setWorkingHours] = useState([]);

    useEffect(() => {
        const fetchWorkingHours = async () => {
            try {
                const response = await axios.get('/api/attendance/working-hours');
                setWorkingHours(response.data); // Assuming response.data is an object containing employee IDs and their working hours
            } catch (err) {
                console.error('Error fetching working hours:', err);
            }
        };
        fetchWorkingHours();
    }, []);

    const columns = [
        {
            title: 'Employee ID',
            dataIndex: 'employeeId',
            key: 'employeeId',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Working Hours',
            dataIndex: 'workingHours',
            key: 'workingHours',
        },
    ];

    // Transform working hours data into table format
    const dataSource = Object.entries(workingHours).reduce((acc, [employeeId, workingHoursObj]) => {
        return [
            ...acc,
            ...Object.entries(workingHoursObj).map(([date, hours]) => ({
                employeeId,
                date,
                workingHours: hours,
            })),
        ];
    }, []);

    return (
       
            <div>
                <h2>Working Hours Records</h2>
                <Table dataSource={dataSource} columns={columns} />
            </div>
     
    );
};

export default WorkingHours;
