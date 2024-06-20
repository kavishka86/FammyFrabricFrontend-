import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, message, Tag } from "antd";
import moment from "moment";
import EmpLaout from "../Components/EmpLaout";

function ApproveReservations() {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const response = await axios.post("/api/ApproveRoutes/admin/reservations");
      console.log("Reservations data:", response.data); // Log response data
      setReservations(response.data.reservations.reverse());
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
      message.error("Failed to fetch reservations");
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

 

  ///
  const handleApproval = async (id) => {
    try {
      const response = await axios.patch(
        `/api/ApproveRoutes/admin/approve/${id}`
      );
      message.success(response.data.message); // Assuming backend sends a message field
      fetchReservations(); // Fetch updated reservations after approval
    } catch (error) {
      console.error("Failed to approve reservation:", error);
      message.error("Failed to approve reservation");
    }
  };

  const handleRejection = async (id) => {
    try {
      const response = await axios.patch(
        `/api/ApproveRoutes/admin/reject/${id}`
      );
      message.success(response.data.message); // Assuming backend sends a message field
      fetchReservations(); // Fetch updated reservations after rejection
    } catch (error) {
      console.error("Failed to reject reservation:", error);
      message.error("Failed to reject reservation");
    }
  };

  //




  return (
    <EmpLaout>
    <div>
        
    <h3 className='ti'>Approve Reservations</h3>
        <hr className='br'></hr>
      
      <Table
        dataSource={reservations}
        rowKey="_id"
        columns={[
          {
            title: "Index",
            dataIndex: "index",
            key: "index",
            render: (_, __, rowIndex) => rowIndex + 1,
          },
         
          { title: "Name", dataIndex: "cname", key: "cname" },
          { title: "Contact Number", dataIndex: "cnumber", key: "cnumber" },
          { title: "Email", dataIndex: "cgmail", key: "cgmail" },
          { title: "Details", dataIndex: "cdetails", key: "cdetails" },
          {
            title: "Booking Date",
            dataIndex: "bookingDate",
            key: "bookingDate",
            render: (bookingDate) => moment(bookingDate).format("MM/DD/YYYY"),
          },
          {
            title: "Booking Time",
            dataIndex: "bookingTime",
            key: "bookingTime",
            render: (bookingTime) => moment(bookingTime).format("hh:mm A"),
          },
          {
            title: "Status",
            dataIndex: "adminDecision",
            key: "adminDecision",
            render: (adminDecision) => {
              let color = "blue"; // Default color for Pending status
              if (adminDecision === "Approved") {
                color = "green";
              } else if (adminDecision === "Rejected") {
                color = "red";
              }
              return <Tag color={color}>{adminDecision}</Tag>;
            },
          },
          {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <>
                <Button onClick={() => handleApproval(record._id)}>
                  Approve
                </Button>
                <Button onClick={() => handleRejection(record._id)}>
                  Reject
                </Button>
              </>
            ),
          },
        ]}
        pagination={{ pageSize: 6 }}
      />
    </div>
    </EmpLaout>
  );
}

export default ApproveReservations;
