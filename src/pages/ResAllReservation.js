import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, message,Tag } from "antd";
import { Link } from "react-router-dom";
import "./ResAllReservation.css"; // Import the CSS file here
import Layout from "../Components/Layout";

function ResAllReservation() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const response = await axios.get("/api/ResRoute/getResForm");
        setReservations(response.data.bookings.reverse()); // Reverse the order of the array
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
        message.error("Failed to fetch reservations");
      }
    }

    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/ResRoute/deletebooking/${id}`);
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation._id !== id)
      );
      message.success("Reservation deleted successfully");
    } catch (error) {
      console.error("Failed to delete reservation:", error);
      message.error("Failed to delete reservation");
    }
  };

  // Define custom header component
  const CustomHeader = () => (
    <thead className="custom-header">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Contact Number</th>
        <th>Email</th>
        <th>Details</th>
        <th>Action</th>
      </tr>
    </thead>
  );

  return (
    <Layout>
    <div>
      <center>
        <h1 className="mb-1">Reservations</h1>
      </center>
      <br />
      <div className="table-container">
        <div style={{ width: "100%" }}>
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
              
              {
                title: "Name",
                dataIndex: "cname",
                key: "cname",
              },
              {
                title: "Number",
                dataIndex: "cnumber",
                key: "cnumber",
              },
              {
                title: "Email",
                dataIndex: "cgmail",
                key: "cgmail",
              },

              // .......................
              {
                title: "Booking Date",
                dataIndex: "bookingDate",
                key: "bookingDate",
                render: (bookingDate) =>
                  new Date(bookingDate).toLocaleDateString(), // Format date
              },
              {
                title: "Booking Time",
                dataIndex: "bookingTime",
                key: "bookingTime",
                render: (bookingTime) =>
                  new Date(bookingTime).toLocaleTimeString(), // Format time
              },
              //

              {
                title: "Details",
                dataIndex: "cdetails",
                key: "cdetails",
              },

              {
                title: "Place Date and Time",
                dataIndex: "createdAt",
                key: "createdAt",
                render: (createdAt) => new Date(createdAt).toLocaleString(), // Format date and time
              },
              // ..........................
              {
                title: "Reservation Status",
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

              // .......................................

              {
                title: "Action",
                key: "action",
                render: (_, record, index) => (
                  <>
                    {index < 1 && (
                      <>
                        <Button className="updates">
                          <Link to={`/updates/${record._id}`}>Update</Link>
                        </Button>
                       {/*  */}
                       {/*  */}
                      </>
                    )}

                     <Button
                          className="delete"
                          onClick={() => handleDelete(record._id)}
                        >
                          Delete
                    </Button>
                  </>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
    </Layout>
  );
}

export default ResAllReservation;
