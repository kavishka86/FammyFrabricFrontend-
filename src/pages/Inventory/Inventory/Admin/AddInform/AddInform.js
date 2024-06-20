import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
// import Sidebar from "../SideBar/Sidebar";
import "../Admin.css";
import EmpLaout from "../../../../../Components/EmpLaout";

function AddInform() {
  const navigate = useNavigate(); // Changed variable name to navigate
  const [inputs, setInputs] = useState({
    name: "",
    material: "",
    color: "",
    amount: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    window.alert("added successfully!");
    navigate("/");
  };
  const sendRequest = async () => {
    await axios.post("http://localhost:5001/inform", {
      name: inputs.name,
      material: inputs.material,
      color: inputs.color,
      amount: inputs.amount,
    });
  };
  return (
    <EmpLaout>
    <div>
    
      <div className="children_div_admin">
        <h1 className="topic_inventory">
          Inform<span className="sub_topic_inventory"> Item</span>{" "}
        </h1>
        <div className="item_full_box">
          <form className="item_form_admin" onSubmit={handleSubmit}>
            <label className="form_box_item_lable">name</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              required
              value={inputs.name}
              onChange={handleChange}
              name="name"
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
            <label className="form_box_item_lable">Quantity</label>
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
            <button type="submit" className="admin_form_cneter_btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    </EmpLaout>
  );
}

export default AddInform;
