import React from "react";
import { Table, Button, Popconfirm, message } from 'antd';
import moment from "moment";
import axios from "axios";

const PaymentComponent = ({ payments, startDate, endDate }) => {
  const filteredPayments = payments.filter(payment => {
    if (startDate && endDate) {
      return moment(payment.createdAt).isBetween(startDate, endDate);
    }
    return true;
  });

  const handleDelete = async (paymentId) => {
    try {
      await axios.delete(`/api/payment/${paymentId}`);
      window.location.reload();
      message.success('Deleted Payment Successfully');
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

  const columns = [
    {
      title: 'Customer Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Customer Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'ZIP Code',
      dataIndex: 'zip',
      key: 'zip',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      key: 'actions',
      render: (paymentId) => (
        <Popconfirm
          title="Are you sure to delete this payment?"
          onConfirm={() => handleDelete(paymentId)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" className="delete-btn">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={filteredPayments} rowKey="_id" />
  );
};

export default PaymentComponent;