import React from "react";
import { Form, Radio } from "antd";
import moment from "moment";

const timeOptions = [
  { label: "9:00 AM", value: moment().startOf("day").hour(9).minute(0) },
  { label: "10:00 AM", value: moment().startOf("day").hour(10).minute(0) },
  { label: "11:00 AM", value: moment().startOf("day").hour(11).minute(0) },
  { label: "12:00 PM", value: moment().startOf("day").hour(12).minute(0) },
  { label: "1:00 PM", value: moment().startOf("day").hour(13).minute(0) },
  { label: "2:00 PM", value: moment().startOf("day").hour(14).minute(0) },
  { label: "3:00 PM", value: moment().startOf("day").hour(15).minute(0) },
  { label: "4:00 PM", value: moment().startOf("day").hour(16).minute(0) },
  { label: "5:00 PM", value: moment().startOf("day").hour(17).minute(0) },
  { label: "6:00 PM", value: moment().startOf("day").hour(18).minute(0) },
];

const CustomTimePicker = ({ onChange }) => {
  const handleTimeChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <Form.Item
      name="bookingTime"
      rules={[{ required: true, message: "Please select a time!" }]}
    >
      <Radio.Group onChange={handleTimeChange} required>
        {timeOptions.map((option, index) => (
          <Radio.Button key={index} value={option.value}>
            {option.label}
          </Radio.Button>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

export default CustomTimePicker;
