import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
//import Sidebar from "../SideBar/Sidebar";
import "../Admin.css";
import EmpLaout from "../../../../../Components/EmpLaout";

const URL = "http://localhost:5001/inventory";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

//----------------------------------------------------------------
function DashBoard() {
  //fetch data
  const [inven, setInven] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setInven(data.inven));
  }, []);

  // Function to calculate the total amount
  const [totalAmount, setTotalAmount] = useState(0); // State to store the total amount
  useEffect(() => {
    let sum = 0;
    inven.forEach((item) => {
      sum += parseInt(item.price); // Convert price to integer and sum up
    });
    setTotalAmount(sum);
  }, [inven]);

  /*Delete Function */
  const history = useNavigate();
  const deleteHandler = async (_id) => {
    // Define _id as a parameter
    const confirmed = window.confirm(
      "Are you sure you want to delete this Details?"
    );

    if (confirmed) {
      try {
        await axios.delete(`${URL}/${_id}`); // Correct URL construction
        window.alert("details deleted successfully!");
        history("/");
        window.location.reload(); // Reload the page
      } catch (error) {
        // Handle deletion error if needed
        console.error("Error deleting details:", error);
      }
    }
  };

  /*PDF Function */
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: " Details Report",
    onafterprint: () => alert(" Details Report Successfully Download !"),
  });

  /*Search Function */
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filtered = data.inven.filter((inven) =>
        Object.values(inven).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setInven(filtered);
      setNoResults(filtered.length === 0);
    });
  };

  //function for get curent date  for send whatsapp message
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    // Function to get the current date and format it
    const getCurrentDate = () => {
      const dateObj = new Date();
      const month = dateObj.getMonth() + 1;
      const day = String(dateObj.getDate()).padStart(2, "0");
      const year = dateObj.getFullYear();
      const formattedDate = `${year}-${month}-${day}`;
      setCurrentDate(formattedDate);
    };

    getCurrentDate();
    const intervalId = setInterval(getCurrentDate, 1000);
    return () => clearInterval(intervalId);
  }, []);

  /*Send  WhatsApp*/
  const handleSendReport = () => {
    //Create the WhatsApp Chat URL
    const phoneNumber = "+94776827697";
    const message = `Total Amount =  Rs.${totalAmount}.00 --> date = ${currentDate}`;
    const WhatsAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    //open the whatsapp chat in new Window
    window.open(WhatsAppUrl, "_blank");
  };

  //item count
  const availableItemCount = inven.length;
  return (
    <EmpLaout>
    <div>
      
      <div className="children_div_admin">
        <div className="dash_button_set">
          <button className="btn_dash_admin" onClick={handlePrint}>
            Generate Report
          </button>
          <tr>
            <td className="">
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                name="search"
                className="serch_inpt"
                placeholder="Search Here..."
              ></input>
            </td>

            <td>
              <button onClick={handleSearch} className="btn_dash_admin">
                Search
              </button>
            </td>
          </tr>
          <button onClick={handleSendReport} className="btn_dash_admin">
            Send Total Amount
          </button>
        </div>

        <div className="tbl_con_admin" ref={ComponentsRef}>
          <h1 className="topic_inventory">
            Inventory Item<span className="sub_topic_inventory"> Details</span>{" "}
          </h1>
          <div className="summry_admindsh">
            <p className="item_summry_box">
              <b>Total Price: </b>Rs.{totalAmount}.00
            </p>
            <br />
            <p className="item_summry_box">
              <b>Available Items:</b> {availableItemCount}
            </p>
          </div>
          <table className="table_details_admin">
            <thead>
              <tr className="admin_tbl_tr">
                <th className="admin_tbl_th">Photo</th>
                <th className="admin_tbl_th">stockid</th>
                <th className="admin_tbl_th">supplierid</th>
                <th className="admin_tbl_th">name</th>
                <th className="admin_tbl_th">material</th>
                <th className="admin_tbl_th">color</th>
                <th className="admin_tbl_th">quantity</th>
                <th className="admin_tbl_th">price</th>
                <th className="admin_tbl_th">action</th>
              </tr>
            </thead>
            {noResults ? (
              <div>
                <br></br>
                <h1 className="con_topic">
                  No <span className="clo_us"> Found</span>{" "}
                </h1>
              </div>
            ) : (
              <tbody>
                {inven.map((item, index) => (
                  <tr className="admin_tbl_tr" key={index}>
                    <td className="admin_tbl_td">
                      <img
                        src={item.imgurl}
                        alt="img"
                        className="img_admin_tbl"
                      />
                    </td>
                    <td className="admin_tbl_td">{item.stockid}</td>
                    <td className="admin_tbl_td">{item.supplierid}</td>
                    <td className="admin_tbl_td">{item.name}</td>
                    <td className="admin_tbl_td">{item.material}</td>
                    <td className="admin_tbl_td">{item.color}</td>
                    <td className="admin_tbl_td">{item.amount}</td>
                    <td className="admin_tbl_td">Rs.{item.price}.00</td>
                    <td className="admin_tbl_td">
                      <button
                        onClick={() => deleteHandler(item._id)}
                        className="btn_dash_admin_dlt"
                      >
                        Delete
                      </button>{" "}
                      {/* Pass item._id to deleteHandler */}
                      <Link
                        to={`/updateitem/${item._id}`}
                        className="btn_dash_admin"
                      >
                        Update
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
    </EmpLaout>
  );
}

export default DashBoard;
