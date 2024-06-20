import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Admin/Admin.css";
import "../User.css";
import Layout from "../../../../../Components/Layout"; // Moved import statement here

const URL = "http://localhost:5001/inventory";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function DetailsDash() {
  //fetch data
  const [inven, setInven] = useState([]);
  const [displayedInven, setDisplayedInven] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      setInven(data.inven);
      setDisplayedInven(data.inven);
    });
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  /*Search Function */
  const handleSearch = () => {
    const filtered = inven.filter((item) =>
      Object.values(item).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setDisplayedInven(filtered);
    setNoResults(filtered.length === 0);
  };

  return (
    <Layout>
      <div>
        <div className="searchdetil">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            className="serch_inpt"
            placeholder="Search Here.."
          ></input>
          <button onClick={handleSearch} className="btn_dash_admin">
            Search
          </button>
        </div>
        <div>
          { (
            <div>
              {displayedInven.length > 0 ? (
                displayedInven.reduce((rows, item, index) => {
                  if (index % 4 === 0) rows.push([]);
                  rows[rows.length - 1].push(item);
                  return rows;
                }, []).map((row, rowIndex) => (
                  <div key={rowIndex} className="item_full_box_user">
                    {row.map((item, index) => (
                      <div key={index} className="item_card_user">
                        <div>
                          <img src={item.imgurl} alt="img" className="itm_img" />
                        </div>
                        <h2 className="name_itm">{item.name}</h2>

                        <p className="itm_card_details">
                          <b>Material</b> : {item.material}
                        </p>
                        <p className="itm_card_details">
                          <b>Color</b> : {item.color}
                        </p>
                        <p className="itm_card_details">
                          <b>Quantity</b> : {item.amount}
                        </p>

                        <h3 className="name_itm_price">Rs.{item.price}.00</h3>
                        <button className="admin_form_cneter_btn">Available</button>
                        <br></br>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <div>
                  <br></br>
                  <h1 className="con_topic">
                    Loading...
                  </h1>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      </Layout>
  );
}

export default DetailsDash;
