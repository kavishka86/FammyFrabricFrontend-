import React, { useEffect, useState, useRef } from 'react'; // Import useRef
import axios from 'axios';
import { Table, Button, Input, Space } from 'antd';

import { useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import EmpLaout from '../Components/EmpLaout';

const { Search } = Input;

const AttendanceList = () => {
    const [attendance, setAttendance] = useState([]);
    const [employeeAttendanceCount, setEmployeeAttendanceCount] = useState({});
    const [employeeWorkingHours, setEmployeeWorkingHours] = useState({});
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const navigate = useNavigate();
    const searchInput = useRef(null); // Use useRef for search input

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get('/api/attendance');
                setAttendance(response.data);
            } catch (err) {
                console.error('Error fetching attendance:', err);
            }
        };
        fetchAttendance();
    }, []);

    useEffect(() => {
        const countAttendance = () => {
            const count = attendance.reduce((acc, record) => {
                const { employeeId, status } = record;
                if (status === 'Present') {
                    acc[employeeId] = acc[employeeId] ? acc[employeeId] + 1 : 1;
                }
                return acc;
            }, {});
            setEmployeeAttendanceCount(count);
        };
        countAttendance();
    }, [attendance]);

    useEffect(() => {
        const calculateWorkingHours = () => {
            const workingHoursData = {};
            attendance.forEach(record => {
                const { employeeId, hoursWorked } = record;
                if (!workingHoursData[employeeId]) {
                    workingHoursData[employeeId] = 0;
                }
                workingHoursData[employeeId] += hoursWorked;
            });
            setEmployeeWorkingHours(workingHoursData);
        };
        calculateWorkingHours();
    }, [attendance]);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current.select(), 100);
            }
        },
    });

    const columns = [
        {
            title: 'Employee ID',
            dataIndex: 'employeeId',
            key: 'employeeId',
            ...getColumnSearchProps('employeeId'),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Hours Worked',
            dataIndex: 'hoursWorked',
            key: 'hoursWorked',
        },
        {
            title: 'Total Hours Worked (up to now)',
            dataIndex: 'employeeId',
            key: 'totalHoursWorked',
            render: (employeeId) => {
                return employeeWorkingHours[employeeId] || 0;
            },
        },
    ];

    return (
        <EmpLaout>
     
    <div>
        <h2>Attendance Records</h2>
        <div className="ant-table">
            <Table dataSource={attendance} columns={columns} />
        </div>
        <div className="button-container">
            <Button type="primary" onClick={() => navigate('/AttendanceForm')}>
                Mark Attendance
            </Button>
        </div>
        <div>
            <h3>Employee Attendance Counts</h3>
            <ul>
                {Object.entries(employeeAttendanceCount).map(([employeeId, count]) => (
                    <li key={employeeId}>{`Employee ID: ${employeeId} - Present: ${count}`}</li>
                ))}
            </ul>
        </div>
    </div>
    </EmpLaout>

    );
};

export default AttendanceList;
