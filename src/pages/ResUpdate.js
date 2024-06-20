import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input } from "antd";
import moment from "moment";
import CustomTimePicker from "./ResFormTimePicker";


import "./ResForm.css";
import Layout from "../Components/Layout";

function ResUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchResModel = async () => {
      try {
        const response = await axios.get(`/api/ResRoute/getresForm2/${id}`);
        if (response.data.success) {
          const data = response.data.bookings;
          const bookingDate = moment(data.bookingDate);
          // const bookingTime = moment(data.bookingTime);
          form.setFieldsValue({
            id: data.id,
            cname: data.cname,
            cnumber: data.cnumber,
            cgmail: data.cgmail,
            cdetails: data.cdetails,
          });
          setSelectedDate(bookingDate.format("YYYY-MM-DD"));
        } else {
          toast.error("Booking not found!");
          navigate("/reservation");
        }
      } catch (error) {
        toast.error("Failed to fetch data!");
      }
    };

    fetchResModel();
  }, [id, form, navigate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    const updatedValues = {
      ...values,
      bookingDate: selectedDate,
    };

    try {
      const response = await axios.put(
        `/api/ResRoute/updateResForm/${id}`,
        updatedValues
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/reservation");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Custom validation rule for phone number
  const validatePhoneNumber = (_, value) => {
   // Sri Lankan phone number format
    if (!value || /^(0\d{9})$/.test(value)) {
     
      return Promise.resolve();
    }
 
    return Promise.reject("Please enter a valid Sri Lankan phone number!");
  };

  return (
   <Layout>
    <div className="Resform">
      <div className="form box p-3">
        <h3 className="title">Update Your Reservation</h3>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <div className="form-row">
            <div className="item">
              <Form.Item
                label="Name"
                name="cname"
                rules={[
                  { required: true, message: "Please enter your full name!" },
                  {
                    pattern: /^[A-Za-z\s]+$/,
                    message: "Please enter only letters and spaces.",
                  },
                ]}
              >
                <Input placeholder="Enter your full name" type="text" />
              </Form.Item>
            </div>
          </div>
          <div className="form-row">
            <div className="item">
              <Form.Item
                label="Contact Number"
                name="cnumber"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number!",
                  },
                  { validator: validatePhoneNumber },
                ]}
              >
                <Input placeholder="Your phone number" type="number" />
              </Form.Item>
            </div>
          </div>
          <div className="form-row">
            <div className="item">
              <Form.Item
                label="Email"
                name="cgmail"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input placeholder="Your email address" type="email" />
              </Form.Item>
            </div>
          </div>

          <div className="form-row">
            <div className="item">
              <label htmlFor="dateInput">Select Reservation Date</label>
              <input
                id="dateInput"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                min={moment().format("YYYY-MM-DD")}
                max={moment()
                  .add(1, "month")
                  .endOf("month")
                  .format("YYYY-MM-DD")}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #d9d9d9",
                  outline: "none",
                }}
                required // Add the required attribute here
              />
              {!selectedDate && selectedDate !== "" && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  Please select a reservation date.
                </p>
              )}
            </div>
          </div>

          {/* Reservation Time */}
          <div className="form-row">
            <div className="item">
              <CustomTimePicker
                onChange={(time) =>
                  form.setFieldsValue({
                    bookingTime: time,
                  })
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="item">
              <Form.Item
                label="Details"
                name="cdetails"
                rules={[
                  {
                    required: true,
                    message: "Please provide reservation details!",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Tell us more about your reservation..."
                  autoSize={{ minRows: 6, maxRows: 8 }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="Button-cons">
            <Button className="primary-button my-2" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>

    </Layout>
   
  );
}

export default ResUpdate;
