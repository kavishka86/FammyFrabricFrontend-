import React from "react";
import axios from "axios";
// import { Button, Form, Input } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./ResForm.css";
import { Button, Form, Input} from "antd";
import moment from "moment";
import CustomTimePicker from "./ResFormTimePicker";
import Layout from "../Components/Layout";

function ResForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm(); // Define form instance

  const onFinish = async (values) => {
    console.log("Received values of form", values);

    try {
      const response = await axios.post("/api/ResRoute/ResForm", values);

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
        <h3 className="title">Create Your Reservation</h3>
        {/* Ant Design Form component */}
        <Form layout="vertical" form={form} onFinish={onFinish}>
          {/* Form fields */}
          <div className="form-row">
            <div className="item">
              {/* Name input field */}
              <Form.Item
                label="Name"
                name="cname"
                // Validation rules for name field
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
          {/* Other form fields with similar structure and validation rules */}
          {/* Contact Number */}
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
                  { validator: validatePhoneNumber }, // Custom validation for phone number
                ]}
              >
                <Input placeholder="Enter Your phone number" type="number" />
              </Form.Item>
            </div>
          </div>
          {/* Email */}
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
                <Input placeholder="Enter Your email address" type="email" />
              </Form.Item>
            </div>
          </div>

          {/* Reservation Date */}

          <div className="form-row">
            <div className="item">
              <Form.Item
                label="Select Reservation Date"
                name="bookingDate"
                rules={[
                  {
                    required: true,
                    message: "Please select a Reservation date!",
                  },
                ]}
              >
                {/* Use the HTML input element with type "date" */}
                <input
                  className="custom-date-picker"
                  type="date"
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
                />
              </Form.Item>
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
          {/* Reservation Details */}
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
          {/* Form submission button */}
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

export default ResForm;
