import React from 'react';
import axios from 'axios';
import { Button, Form, Input } from 'antd';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../Sup.css';
import EmpLaout from '../Components/EmpLaout';

function SupOrders() {
    const navigate = useNavigate();
    const [sform] = Form.useForm(); // Define sform instance

    const onFinish = async (values) => {
        console.log('Received values of sform', values);

        try {
            const response = await axios.post('/api/SupRoute/SupForm', values);

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
                <h3 className='title'>place order</h3>
                <Form layout='vertical' onFinish={onFinish}>


                    <div className="sform-row">
                        <div className="item">
                            <Form.Item label='Name' name='name'>
                                <Input placeholder='name' />
                            </Form.Item>
                        </div>

                    </div>

                    <div className="sform-row">
                        <div className="item">
                            <Form.Item label='Matirial' name='mat'>
                                <Input placeholder='mat' />
                            </Form.Item>
                        </div>

                    </div>
                    <div className="sform-row">
                        <div className="item">
                            <Form.Item label='Color' name='color'>
                                <Input placeholder='color' />
                            </Form.Item>
                        </div>

                    </div>

                    <div className="sform-row">
                        <div className="item">
                            <Form.Item label='Price' name='price'>
                                <Input placeholder='price' />
                            </Form.Item>
                        </div>

                    </div>

                    <div className="sform-row">
                        <div className="item">
                            <Form.Item label='Quantity' name='quan'>
                                <Input placeholder='quan' />
                            </Form.Item>
                        </div>

                    </div>

                    <div className="Button-cons">
                        <Button className='primary-button my-2' htmlType='submit'>OK</Button>
                    </div>
                </Form>
            </div>
        </div>

        </EmpLaout>
    
    );
}

export default SupOrders;