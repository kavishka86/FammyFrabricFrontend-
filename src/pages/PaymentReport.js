import React, { useEffect, useState, useRef } from "react";
import PaymentComponent from "../Components/PaymentComponent";
import { DatePicker, Button, Input } from 'antd';
import { useReactToPrint } from 'react-to-print';
import EmpLaout from "../Components/EmpLaout";
import "./Payment.css";

function PaymentReport() {
    const conponentPDF = useRef();
    const [payments, setPayments] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [sumAmount, setSumAmount] = useState(0);
    const [employeeSalary, setEmployeeSalary] = useState('');

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch('/api/payment');
                if (response.ok) {
                    const data = await response.json();
                    setPayments(data.data);
                } else {
                    console.error('Failed to fetch payments:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching payments:', error);
            }
        };

        fetchPayments();
    }, []);

    const handleDateRangeChange = (dates) => {
        if (dates && dates.length === 2) {
            const [start, end] = dates;
            setStartDate(start.format('YYYY-MM-DD'));
            setEndDate(end.format('YYYY-MM-DD'));
        } else {
            setStartDate(null);
            setEndDate(null);
        }
    };

    const calculateSumAmount = () => {
        let sum = 0;
        payments.forEach(payment => {
            const paymentDate = new Date(payment.createdAt);
            if (paymentDate >= new Date(startDate) && paymentDate <= new Date(endDate)) {
                sum += payment.amount;
            }
        });
        setSumAmount(sum);
    };

    const generatePDF = useReactToPrint({
        content: () => conponentPDF.current,
        documentTitle: "Userdara",
        onAfterPrint: () => alert("Data saved in PDF")
    });

    return (
        <EmpLaout>
            <div className="background-report">
                <div ref={conponentPDF}>
                    <h1 className="text1">All Payments</h1>
                    <DatePicker.RangePicker onChange={handleDateRangeChange} />
                    <PaymentComponent payments={payments} startDate={startDate} endDate={endDate} />
                    <div className="form-container">
                        <Button className="update-btn" onClick={calculateSumAmount}>Sum of Amounts</Button>
                        <br></br>
                        <span className="text3">Total Amount: {sumAmount}</span>
                    </div>
                    <hr/>
                    <div className="form-container">
                        <label className="text3">Employee Salary Amount (Rs.)</label>
                        <Input
                            type="number"
                            placeholder="Rs."
                            value={employeeSalary}
                            onChange={(e) => setEmployeeSalary(e.target.value)}
                        />
                    </div>
                </div>
                <div className="button-container">
                    <button className="get-button" onClick={generatePDF}>Get PDF</button>
                </div>
            </div>
        </EmpLaout>
    );
};

export default PaymentReport;
