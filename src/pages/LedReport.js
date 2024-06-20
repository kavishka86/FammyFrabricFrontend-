import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { message, Modal, Form, Input } from 'antd';
import { useReactToPrint } from 'react-to-print';
import EmpLaout from '../Components/EmpLaout';
import { useSelector } from 'react-redux';
import './LedRecss.css';


function LedForm() {
   
    const conponentPDF = useRef();

    const { employee } = useSelector((state) => state.employee);

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
    }, []);

    const generatePDF = useReactToPrint({
        content: () => conponentPDF.current,
        documentTitle: "Userdara",
        onAfterPrint: () => alert("Data saved in PDF")
    });

    return (
        <EmpLaout>
        <div>
            <div>
                <h2 className='rep'>Report</h2>
            </div>
            
            <div ref={conponentPDF}>
                {LedFinancial.map(item => (
                    <div key={item.key} className="ledbox">
                        <h3 className="id">ID: {item.id}</h3>
                        <p>Month: {item.month}</p>
                        <p>Monthly Income: {item.income}</p>
                        <p>Monthly Employee Salary: {item.salary}</p>
                        <p>Monthly Material Cost: {item.cost}</p>
                        <p>Other Cost: {item.other}</p>
                        <p className="profit">Monthly Profit: {item.income - (item.salary + item.cost + item.other)}</p>
                    </div>
                ))}
            </div>
            
            <div className="Button-cons">
                <button className='ledprimary-button my-2' onClick={generatePDF}>Get PDF</button>
            </div>
        </div>
        </EmpLaout>
    );
}

export default LedForm;