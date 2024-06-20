import React, { useState } from 'react';
import { Button, Table, Select } from 'antd'; // Import Select component
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './EmpSalary.css'; // Import CSS file
import EmpLaout from '../Components/EmpLaout';

const { Option } = Select;

function SalaryCalculation() {
    const [employees, setEmployees] = useState([]);
    const [currentEmployee, setCurrentEmployee] = useState({
        employeeId: '',
        name: '',
        attendance: '',
        workingHours: '',
        salary: '',
        employeeType: '',
    });

    const calculateSalary = (employee) => {
        let hourlyRate = 0;
        switch (employee.employeeType) {
            case 'Manager':
                hourlyRate = 10;
                break;
            case 'Sales Associate':
                hourlyRate = 5;
                break;
            case 'Garment Worker':
                hourlyRate = 3;
                break;
            default:
                hourlyRate = 0;
        }
        const totalSalary = employee.attendance * employee.workingHours * hourlyRate;
        return totalSalary;
    };

    const addEmployee = () => {
        const newEmployee = { ...currentEmployee, salary: calculateSalary(currentEmployee) };
        setEmployees([...employees, newEmployee]);
        setCurrentEmployee({
            employeeId: '',
            name: '',
            attendance: '',
            workingHours: '',
            salary: '',
            employeeType: '',
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentEmployee({ ...currentEmployee, [name]: value });
    };

    const handleSelectChange = (value) => {
        setCurrentEmployee({ ...currentEmployee, employeeType: value });
    };

    const handleDownloadPDF = () => {
        html2canvas(document.getElementById('salary-table')).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 208;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, 0, 0, imgWidth, imgHeight);
            pdf.save('salary_details.pdf');

            // After downloading the PDF, open WhatsApp Web with the PDF file attached
            openWhatsAppWithPDF();
        });
    };

    const openWhatsAppWithPDF = () => {
        // Construct the WhatsApp message with the PDF file attached
        const message = `Sending salary details via WhatsApp. Check the attached file.`;
        const whatsappNumber = 'YOUR_WHATSAPP_NUMBER'; // Replace with the recipient's WhatsApp number
        const url = `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

        // Open WhatsApp Web with the PDF file attached
        window.open(url, '_blank');
    };

    const columns = [
        { title: 'Employee ID', dataIndex: 'employeeId', key: 'employeeId' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Attendance', dataIndex: 'attendance', key: 'attendance' },
        { title: 'Working Hours', dataIndex: 'workingHours', key: 'workingHours' },
        { title: 'Salary', dataIndex: 'salary', key: 'salary' },
    ];

    return (
        <EmpLaout>
            <div className="container">
                <h3>Salary Calculation</h3>
                <div className="form-group">
                    <label>Employee Type</label>
                    <Select
                        name="employeeType"
                        style={{ width: '100%' }}
                        placeholder="Select employee type"
                        value={currentEmployee.employeeType}
                        onChange={handleSelectChange}
                    >
                        <Option value="Manager">Manager</Option>
                        <Option value="Sales Associate">Sales Associate</Option>
                        <Option value="Garment Worker">Garment Worker</Option>
                    </Select>
                </div>
                <div className="form-group">
                    <label>Employee ID</label>
                    <input
                        name="employeeId"
                        type="text"
                        className="form-control"
                        placeholder="Enter ID"
                        value={currentEmployee.employeeId}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Employee Name</label>
                    <input
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="Enter name"
                        value={currentEmployee.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Attendance</label>
                    <input
                        name="attendance"
                        type="number"
                        className="form-control"
                        placeholder="Attendance"
                        value={currentEmployee.attendance}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Working Hours</label>
                    <input
                        name="workingHours"
                        type="number"
                        className="form-control"
                        placeholder="Working Hours"
                        value={currentEmployee.workingHours}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Net Salary</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Net Salary"
                        value={currentEmployee.salary}
                        readOnly
                    />
                </div>
                <Button
                    type="primary"
                    onClick={addEmployee}
                    className="btn btn-primary mt-4"
                >
                    Add Employee
                </Button>
                <div className="mt-4">
                    <h3>Salary Details</h3>
                    <div id="salary-table">
                        <Table
                            dataSource={employees}
                            columns={columns}
                            rowKey={(record, index) => index}
                        />
                    </div>
                </div>
                <div className="Button-cons">
                    <button className='primary-button my-2' onClick={handleDownloadPDF}>Download PDF and Send via WhatsApp</button>
                </div>
            </div>
        </EmpLaout>
    );
}

export default SalaryCalculation;


