import React, { useEffect } from 'react';
import axios from 'axios';
import EmpLaout from '../Components/EmpLaout';

import backimg from "./image/logo.jpg";
import backimgtwo from "./image/homelogo2.png";
import "./Emphome.css";


function EmpHome() {
    


    const getDatas = async () => {
        try {

            const response = await axios.post('/api/employee/get-employee-info-by-id',{},
                // { employeeId: localStorage.getItem('employeeId') }, // Pass employeeId in the request body
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('tokens')
                    }
                }
            );
            console.log(response.data);

            // setEmployeeInfo(response.data.data); // Assuming the employee info is in response.data.data
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDatas();
    }, []);

    return (
        <EmpLaout>
           <div>
    
      <div className="bInbody_box">
        <div className="bbody_box_left">
          <div className="btopic_home_inventory">
            <h1 className='fin'>Welcome</h1>
            <h1 className='fin'>to</h1>
            <h1 className='fin'>Fammy</h1>
          </div>
        </div>
        <div className="bbody_box_right">
          <img src={backimg} alt="bkimg" className="bbackimg_home" />
        </div>
        
      </div>
    </div>
        </EmpLaout>
    );
}

export default EmpHome;
