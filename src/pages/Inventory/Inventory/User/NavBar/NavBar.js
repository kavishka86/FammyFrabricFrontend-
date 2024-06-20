import React from "react";
import "../User.css";
import "../Home/home.css";
function NavBar() {
  return (
    <div>
      <div className="navbar_inventory">
        <div className="nav_item_navbar">
          <button
            className="nav_item_btn"
            onClick={() => (window.location.href = "/displaydb")}
          >
            Main Page
          </button>
          <button
            className="nav_item_btn"
            onClick={() => (window.location.href = "/userdetailsdash")}
          >
            Product
          </button>
          <button className="nav_item_btn">Logout</button>
          <div>
            <div className="nav_item_hum"></div>
            <div className="nav_item_hum"></div>
            <div className="nav_item_hum"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;