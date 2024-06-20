import React from 'react'
import { Form, Input, Button, DatePicker, Radio, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
// import { hideLoading, showLoading } from '../EmpRedux/EmpAlertsSlice';
// import{  useDispatch} from 'react-redux';
import toast from 'react-hot-toast';
import EmpLaout from '../Components/EmpLaout';
// import { SiderContext } from 'antd/es/layout/Sider';
const { Option } = Select;

function EmpRegister() {
    // const dispactch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {


     

        try {
            // dispactch(showLoading());
            const response = await axios.post('/api/employee/empregister', values);
            // dispactch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                toast("Redirecting to login Page");
                navigate("/empLoin");
            } else {
                toast.error(response.data.message);

            }

        } catch (error) {
            // dispactch(hideLoading());
            toast.error("Something went wrong");
        }
    };

    return (
        <EmpLaout>

        <div className='serch-header'>

            <div className='authenticationsn'>



                <div className='authentication-forms card p-3' >
                    <h1 className='card-title'>Employee</h1>

                    <Form layout='vertical' onFinish={onFinish}>
                        <div className="form-row">
                            <div className="item">
                                <Form.Item label='Name' name='empname' rules={[{ required: true, message: 'Please enter name' }]}>
                                    <Input placeholder='Name' />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="item">
                                <Form.Item label='Date of Birth' name='empdob' rules={[{ required: true, message: 'Please select date of birth' }]}>
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="item">
                                <Form.Item label='Gender' name='empgender' rules={[{ required: true, message: 'Please select gender' }]}>
                                    <Radio.Group>
                                        <Radio value='male'>Male</Radio>
                                        <Radio value='female'>Female</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="item">
                                <Form.Item label='Employee Type' name='empemployeeType' rules={[{ required: true, message: 'Please select employee type' }]}>
                                    <Select placeholder='Select Employee Type' style={{ width: '100%' }}>
                                        <Option value='Tailor'>Tailor</Option>
                                        <Option value='Ledger Book Handler'>Ledger Book Handler</Option>
                                        <Option value='HR Manager'>HR Manager</Option>
                                        <Option value='Inventory Manager'>Inventory Manager</Option>
                                        <Option value='Customer Service Manager'>Customer Service Manager</Option>
                                        <Option value='Financial Manager'>Financial Manager</Option>
                                        <Option value='Supplier Manager'>Supplier Manager</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="item">
                                <Form.Item label='Address' name='empaddress' rules={[{ required: true, message: 'Please enter address' }]}>
                                    <Input.TextArea rows={4} placeholder='Enter your address' />
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
                                <Form.Item label='Email' name='empemail' rules={[
                                    { required: true, message: 'Please enter email' },
                                    { type: 'email', message: 'Please enter a valid email' }
                                ]}>
                                    <Input type="email" placeholder="Email" />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="item">
                                <Form.Item label='Password' name='emppassword' rules={[{ required: true, message: 'Please enter password' }]}>
                                    <Input.Password placeholder="Password" />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="Button-cons">
                            {/* <Button className='primary-button my-2' htmlType='submit'>Submit</Button> */}
                            <Button className='primary-button my-2' htmlType='submit'>REGISTER</Button>
                        
                        </div>

                        

                    </Form>

                    
                </div>

            </div>
        </div>
        </EmpLaout>
    );
}

export default EmpRegister