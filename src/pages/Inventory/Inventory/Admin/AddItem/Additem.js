import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
// import Sidebar from "../SideBar/Sidebar";
import "../Admin.css";
import EmpLaout from "../../../../../Components/EmpLaout";

function Additem() {
  const navigate = useNavigate(); // Changed variable name to navigate
  const [inputs, setInputs] = useState({
    name: "",
    stockid: generateStockId(),
    supplierid: generateSupplierId(),
    material: "",
    color: "",
    amount: "",
    price: "",
    imgurl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  // Function to generate stock ID
  function generateStockId() {
    const prefix = "FF";
    const randomNumber = Math.floor(Math.random() * 100000); // Generates a random number between 0 and 99999
    const paddedNumber = randomNumber.toString().padStart(5, "0"); // Pads the number with zeros to ensure 5 digits
    return `${prefix} ${paddedNumber}`;
  }
  // Function to generate supplier ID
  function generateSupplierId() {
    const prefix = "FS";
    const randomNumber = Math.floor(Math.random() * 100000); // Generates a random number between 0 and 99999
    const paddedNumber = randomNumber.toString().padStart(5, "0"); // Pads the number with zeros to ensure 5 digits
    return `${prefix} ${paddedNumber}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    window.alert("added successfully!");
    navigate("/");
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5001/inventory", {
      name: inputs.name,
      stockid: inputs.stockid,
      supplierid: inputs.supplierid,
      material: inputs.material,
      color: inputs.color,
      amount: inputs.amount,
      price: inputs.price,
      imgurl: inputs.imgurl,
    });
  };
  return (
    <EmpLaout>
    <div>
      <div>
      <div className="children_div_admin">
        <h1 className="topic_inventory">
          Add New<span className="sub_topic_inventory"> Item</span>{" "}
        </h1>
        <div className="item_full_box">
          <form className="item_form_admin" onSubmit={handleSubmit}>
            <label className="form_box_item_lable">Image URL</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              required
              value={inputs.imgurl}
              onChange={handleChange}
              name="imgurl"
            />
            <br></br>
            <label className="form_box_item_lable">Stock Id</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              readOnly
              value={inputs.stockid}
              onChange={handleChange}
              name="stockid"
            />
            <br></br>
            <label className="form_box_item_lable">Supplier Id</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              readOnly
              value={inputs.supplierid}
              onChange={handleChange}
              name="supplierid"
            />
            <br></br>
            <label className="form_box_item_lable">name</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              value={inputs.name}
              onChange={handleChange}
              name="name"
              required
            />
            <br></br>
            <label className="form_box_item_lable">Material</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              value={inputs.material}
              onChange={handleChange}
              name="material"
              required
            />
            <br></br>
            <label className="form_box_item_lable">Color</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              value={inputs.color}
              onChange={handleChange}
              name="color"
              required
            />
            <br></br>
            <label className="form_box_item_lable">quantity</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="number"
              value={inputs.amount}
              onChange={handleChange}
              name="amount"
              required
            />
            <br></br>
            <label className="form_box_item_lable">Price</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="number"
              value={inputs.price}
              onChange={handleChange}
              name="price"
              required
            />
            <br></br>
            <button type="submit" className="admin_form_cneter_btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
   </EmpLaout>
  );
}

export default Additem;
