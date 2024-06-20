import React, { useEffect } from 'react';
import axios from 'axios';
import { Button, DatePicker, Form, Input, Radio, Select } from 'antd';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import EmpLaout from '../Components/EmpLaout';

const { Option } = Select;

function EmpDetailsUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchemployeeModel = async () => {
      try {
        const response = await axios.get(`/api/employee/getEmpRegister2/${id}`);
        if (response.data.success) {
          const data = response.data.employee;
          form.setFieldsValue({
            
            empname: data.empname,
            empdob: data.empdob ? moment(data.dob) : null, // Assuming you're using moment for date formatting
            empgender: data.empgender,
            empemployeeType: data.empemployeeType,
            empaddress:data.empaddress,
            empworkExperienceQualifications: data.empworkExperienceQualifications,
            empemail: data.empemail,
            emppassword: data.emppassword,
          });
        } else {
          toast.error('Employee details not found!');
          navigate('/empEmployees');
        }
      } catch (error) {
        toast.error('Failed to fetch employee details!');
      }
    };

    fetchemployeeModel();
  }, [id, form, navigate]);

  const onFinish = async (values) => {
    try {
      const response = await axios.put(`/api/employee/updateEmpRegister/${id}`, values);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/empEmployees');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update employee details");
    }
  };

  return (
    <EmpLaout>
    
    <div className="annform">
      <div className="AnnHRSup_form box p-3">
        <h3 className='title'>Employee Registration Details</h3>
        <Form layout='vertical' form={form} onFinish={onFinish}>
          
          <div className="form-row">
            <div className="item">
              <Form.Item label='Name' name='empname'>
                <Input placeholder='Name' />
              </Form.Item>
            </div>
          </div>

          <div className="form-row">
            <div className="item">
              <Form.Item label='Date of Birth' name='empdob'>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </div>
          </div>

          <div className="form-row">
            <div className="item">
              <Form.Item label='Gender' name='empgender'>
                <Radio.Group>
                  <Radio value='male'>Male</Radio>
                  <Radio value='female'>Female</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          </div>

          <div className="form-row">
            <div className="item">
              <Form.Item label='Employee Type' name='empemployeeType'>
                <Select placeholder='Select Employee Type' style={{ width: '100%' }}>
                  <Option value='Garment Workers'>Garment Workers</Option>
                  <Option value='Sales Associates'>Sales Associates</Option>
                  <Option value='Managers'>Managers</Option>
                </Select>
              </Form.Item>
            </div>
          </div>

          <div className="form-row">
            <div className="item">
              <Form.Item label='Address' name='empaddress'>
                <Input.TextArea rows={3} placeholder='Enter your Address' />
              </Form.Item>
            </div>
          </div>

          <div className="form-row">
            <div className="item">
              <Form.Item label='Work Experience/Qualifications' name='empworkExperienceQualifications'>
                <Input.TextArea rows={4} placeholder='Enter your work experience (optional)' />
              </Form.Item>
            </div>
          </div>

          <div className="form-row">
            <div className="item">
              <Form.Item label='Email' name='empemail'>
                <Input type="email" placeholder="Email" />
              </Form.Item>
            </div>
          </div>

          <div className="form-row">
            <div className="item">
              <Form.Item label='Password' name='emppassword'>
                <Input.Password placeholder="Password" />
              </Form.Item>
            </div>
          </div>

          <div className="Button-cons">
            <Button className='primary-button my-3' htmlType='submit'>Update</Button>
          </div>
        </Form>
      </div>
    </div>

    </EmpLaout>
  );
}

export default EmpDetailsUpdate;
