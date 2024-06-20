import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
//import Sidebar from "../SideBar/Sidebar";
import "../Admin.css";
import EmpLaout from "../../../../../Components/EmpLaout";

function UpdateItem() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/inventory/${id}`
        );
        setInputs(response.data.inven);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5001/inventory/${id}`, {
        name: String(inputs.name),
        stockid: String(inputs.stockid),
        supplierid: String(inputs.supplierid),
        material: String(inputs.material),
        color: String(inputs.color),
        amount: String(inputs.amount),
        price: String(inputs.price),
        imgurl: String(inputs.imgurl),
      })
      .then((res) => res.data);
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    sendRequest().then(() => {
      window.alert("Update successfully!");
      history("/");
    });
  };
  return (
    <EmpLaout>
    <div>
      
      <div className="children_div_admin">
        <h1 className="topic_inventory">
          Update Item<span className="sub_topic_inventory"> Details</span>{" "}
        </h1>
        <div className="item_full_box">
          <form className="item_form_admin" onSubmit={handleSubmit}>
            <label className="form_box_item_lable">Image URL</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
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
              readOnly
              type="text"
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
            <button type="submit" className="admin_form_cneter_btn">Update</button>
          </form>
        </div>
      </div>
    </div>
    </EmpLaout>
  );
}

export default UpdateItem;
