import React from 'react'
import {Button, Form ,  Input} from 'antd'
// import{useSelector,useDispatch} from 'react-redux';
import {Link, useNavigate }from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';
// import { hideLoading, showLoading } from '../Redux/AlertsSlice';


function EmpLoin() {
// const dispactch = useDispatch();

const navigate = useNavigate();
    const onFinish = async(values) =>{
        try {
            // dispactch(showLoading());
            const response = await axios.post('/api/employee/emplogin', values);
            // dispactch(hideLoading());
            if(response.data.success){
                toast.success(response.data.message);
                toast("Redirecting to Home Page");
                localStorage.setItem("tokens",response.data.data);
                navigate("/emphome");
            }else{
                toast.error(response.data.message);

            }
            
        } catch (error) {
            // dispactch(hideLoading());
            toast.error("Something went wrong");
        }
    }

  return (
    <div className='serch-header'>
   
    <div className='authentication'>
        <div className='authentication-form card p-3' >
            <h1 className='card-title'>Employee</h1>

            <Form layout='vertical' onFinish={onFinish}>
                
                <Form.Item label="Email" name='empemail'>
                    <Input placeholder='email' />
                </Form.Item>
                <Form.Item label="Password" name='emppassword'>
                    <Input placeholder='password' type='password'/>
                </Form.Item>

                 <Button className='primary-button my-2' htmlType='submit'>LOGIN</Button> 
                 <Link  to='/empRegister' className='anchor mt-2'>CLICK HERE TO REGISTER</Link> 

            </Form>
        </div>

    </div>
    </div>
  )
}

export default EmpLoin