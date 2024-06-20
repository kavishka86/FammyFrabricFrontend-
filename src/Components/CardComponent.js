import React from "react";
import axios from "axios";
import { Button ,Table,message} from 'antd';
import { useNavigate } from 'react-router-dom';

const CardComponent=({card})=>{

const navigate = useNavigate();

    const handleDelete = async ()=>{
        try{
            await axios.delete(`/api/card/${card._id}`);
            window.location.reload();
            message.success('Deleted Card Successfully');
        }catch(error){
            console.error("Error deleting card:",error);
        }
    };

    const handleUpdate = async ()=>{
        
            navigate(`/updateCard/${card._id}`);
        
    };

    const columns = [
      {
          title: 'Cardholder Name',
          dataIndex: 'cardholderName',
          key: 'cardholderName',
      },
      {
          title: 'Card Number',
          dataIndex: 'cardNumber',
          key: 'cardNumber',
      },
      {
          title: 'Expire Month',
          dataIndex: 'expireMonth',
          key: 'expireMonth',
      },
      {
          title: 'CVV',
          dataIndex: 'cvv',
          key: 'cvv',
      },
      {
          title: 'Actions',
          key: 'actions',
          render: () => (
              <div>
                  <Button type="primary" className="delete-btn" onClick={handleDelete}>Delete</Button>
                  <Button type="primary" className="update-btn" onClick={handleUpdate}>Update</Button>
              </div>
          ),
      },
  ];

  const data = [card];

  return (
    <Table columns={columns} dataSource={data} rowKey="_id" />
  );
    
};

export default CardComponent;