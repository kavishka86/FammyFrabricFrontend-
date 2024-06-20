import React,{useRef} from "react";
import { useLocation } from 'react-router-dom';

import { useReactToPrint } from 'react-to-print';
import "./Payment.css";
import Layout from "../Components/Layout";

function Bill(){
    const conponentPDF = useRef();
    const location = useLocation();
    const fullName = new URLSearchParams(location.search).get("fullName");
    const address = new URLSearchParams(location.search).get("address");
    const city = new URLSearchParams(location.search).get("city");
    const country = new URLSearchParams(location.search).get("country");
    const amount = new URLSearchParams(location.search).get("amount");

    const generatePDF = useReactToPrint({
        content: () => conponentPDF.current,
        documentTitle: "Userdara",
        onAfterPrint: () => alert("Data saved in PDF")
    });
    
    return(
   <Layout>
        
        <div className="form-container">
            <div ref={conponentPDF}>
                <h2>
                    Thank Your For Choosing Us
                </h2>
                
                <p>Full Name: {fullName}</p>
                <p>Address: {address}</p>
                <p>City: {city}</p>
                <p>Country: {country}</p>
                <p>Amount: {amount}</p>
            </div>
            <div className="button-container">
                    <button className="get-button" onClick={generatePDF}>Get PDF</button>
                </div>
        </div>

        </Layout>
    
    )
}

export default Bill;