import React, { useEffect } from 'react';
import axios from 'axios';
import { Table, Button, message, Modal, Form, Input, Row, Col } from 'antd';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import EmpLaout from '../Components/EmpLaout';


function LedUpdate() {
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming you're using react-router-dom v5 or v6
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchLedFinancial = async () => {
      try {
        const response = await axios.get(`/api/LedFinacialRoutes/getLedForm2/${id}`);
        if (response.data.success) {
          const data = response.data.bookings;
          form.setFieldsValue({
            id: data.id,
            month: data.month,
            income: data.income,
            salary: data.salary,
            cost: data.cost,
            other: data.other,
          });
        } else {
          toast.error('not found!');
          navigate('/leddisplay');
        }
      } catch (error) {
        toast.error('Failed to fetch data!');
      }
    };

    fetchLedFinancial();
  }, [id, form, navigate]);

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    const updatedValues = {
      ...values
    };

    try {
      const response = await axios.put(`/api/LedFinacialRoutes/updateLedForm/${id}`, updatedValues);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/leddisplay');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <EmpLaout>
     <div className="Ledform">
            <div className="form box p-3">
                <h3 className='ti'>Add Report Details</h3>
                <Form layout='vertical' form={form} onFinish={onFinish}>
                <Row gutter={20}>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <div className="form-row">
                        <div className="item">
                            <Form.Item label='ID' name='id'>
                                <Input placeholder='ID' />
                            </Form.Item>
                        </div>
                    </div>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                    <div className="form-row">
                        <div className="item">
                            <Form.Item label='Month' name='month'>
                                <Input placeholder='Month' />
                            </Form.Item>
                        </div>
                    </div>
                    </Col>
                    
                    <Col span={8} xs={24} sm={24} lg={8}>
                    <div className="form-row">
                        <div className="item">
                            <Form.Item label='Monthly Income' name='income'>
                                <Input placeholder='Monthly Income' />
                            </Form.Item>
                        </div>
                    </div>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                    <div className="form-row">
                        <div className="item">
                            <Form.Item label='Monthly Employee Salary' name='salary'>
                                <Input placeholder='Monthly Employee Salary' />
                            </Form.Item>
                        </div>
                    </div>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                    <div className="form-row">
                        <div className="item">
                            <Form.Item label='Monthly Material Cost' name='cost'>
                                <Input placeholder='Monthly Material Cost' />
                            </Form.Item>
                        </div>
                    </div>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                    <div className="form-row">
                        <div className="item">
                            <Form.Item label='Other Cost' name='other'>
                                <Input placeholder='Other Cost' />
                            </Form.Item>
                        </div>
                    </div>
                    </Col>
                   
                    <div className="Button-cons">
                        <Button className='primary-button my-2' htmlType='submit'>Update</Button>
                    </div>
                    </Row>
                </Form>
            </div>
        </div>
    </EmpLaout>
  );
}

export default LedUpdate;