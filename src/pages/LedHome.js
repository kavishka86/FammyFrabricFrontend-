import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import EmpLaout from '../Components/EmpLaout';
import './LedHcss.css';


function LedHome() {
    const navigate = useNavigate(); // Initialize the navigate function using useNavigate hook

    // Function to handle clicking on the "Driver Details" button
    const nav = () => {
        navigate('/ledform');
    };



    return (
        <EmpLaout>
            <div className='wrapper'>
                <form>
                    <h2 className='title'>Financial Manager Dashboard</h2>
                    <div className="mybox">
                       
                        <div className="mybox1" onClick={nav}>
                            <span className='boxname'>Report Generate</span>
                        </div>
                        
                    </div>
                </form>
            </div>

        </EmpLaout>

    );
}

export default LedHome;