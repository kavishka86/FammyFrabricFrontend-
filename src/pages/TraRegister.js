import React from 'react'
import {Button, Form ,  Input} from 'antd'
import {Link, useNavigate }from 'react-router-dom'
import axios from "axios";
// import { hideLoading, showLoading } from '../EmpRedux/EmpAlertsSlice';
// import{  useDispatch} from 'react-redux';
import toast from 'react-hot-toast';
// import { SiderContext } from 'antd/es/layout/Sider';


function TraRegister() {
    // const dispactch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async(values) =>{
        try {
            // dispactch(showLoading());
            const response = await axios.post('/api/user/register', values);
            // dispactch(hideLoading());
            if(response.data.success){
                toast.success(response.data.message);
                toast("Redirecting to login Page");
                navigate("/login");
            }else{
                toast.error(response.data.message);

            }
            
        } catch (error) {
            // dispactch(hideLoading());
            toast.error("Something went wrong");
        }
    };

  return (

    <div className='serch-header'>
    
    <div className='authentication'>
        
       

        <div className='authentication-form card p-3' >
            <h1 className='card-title'>Welcome Our Service</h1>

            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item label="Full Name" name='name'>
                    <Input placeholder='Name' />
                </Form.Item>
                <Form.Item label="Email" name='email'>
                    <Input placeholder='email' />
                </Form.Item>
                <Form.Item label="Password" name='password'>
                    <Input placeholder='password' type='password'/>
                </Form.Item>
                

                 <Button className='primary-button my-2' htmlType='submit'>REGISTER</Button> 
                 <Link  to='/login' className='anchor mt-2'>CLICK HERE TO LOGIN</Link> 

            </Form>
        </div>

    </div>
    </div>
  )
}

export default TraRegister