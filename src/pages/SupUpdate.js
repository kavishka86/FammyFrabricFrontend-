import React, { useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Input } from 'antd';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import '../Sup.css';
import EmpLaout from '../Components/EmpLaout';

function SupUpdate() {
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming you're using react-router-dom v5 or v6
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchSupModel = async () => {
      try {
        const response = await axios.get(`/api/SupRoute/getSupForm2/${id}`);
        if (response.data.success) {
          const data = response.data.bookings;
          form.setFieldsValue({
            id: data.id,
            name: data.name,
            mat: data.mat,
            color: data.color,
            price: data.price,
            quan: data.quan,
          });
        } else {
          toast.error('not found!');
          navigate('/sdisplay');
        }
      } catch (error) {
        toast.error('Failed to fetch data!');
      }
    };

    fetchSupModel();
  }, [id, form, navigate]);

  const onFinish = async (values) => {
    console.log('Received values of sform: ', values);
    const updatedValues = {
      ...values
    };

    try {
      const response = await axios.put(`/api/SupRoute/updateSupForm/${id}`, updatedValues);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/sdisplay');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (

    <EmpLaout>
    <div className="annform">
      <div className="AnnHRSup_form box p-3">
        <h3 className='title'>Add Supplier Details</h3>
        <Form layout='vertical' form={form} onFinish={onFinish}>
          {/* Wrap your input fields inside Form.Item */}
          <Form.Item label='ID' name='id'>
            <Input placeholder='ID' />
          </Form.Item>
          <Form.Item label='Name' name='name'>
            <Input placeholder='name' />
          </Form.Item>
          <Form.Item label='Material' name='mat'>
            <Input placeholder='material' />
          </Form.Item>
          <Form.Item label='Color' name='color'>
            <Input placeholder='color' />
          </Form.Item>
          <Form.Item label='Price' name='price'>
            <Input placeholder='price' />
          </Form.Item>
          <Form.Item label='Quantity' name='quan'>
            <Input placeholder='quantity' />
          </Form.Item>
          <div className="Button-cons">
            <Button className='primary-button my-2' htmlType='submit'>Update</Button>
          </div>
        </Form>
      </div>
    </div>

    </EmpLaout>
  );
}

export default SupUpdate;
