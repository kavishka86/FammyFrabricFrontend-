import React from "react";
//import "./sidebar.css";

const Sidebar = ({ children }) => {
  return (
    <div className="Incontainer_nav">
      <div style={{ width: "200px" }} className="Insidebar">
        <div className="nav_item_main">
          <div>
            <p
              className="Innav_item"
              onClick={() => (window.location.href = "/")}
            >
              DashBoard
            </p>
            <br></br>
            <p
              className="Innav_item"
              onClick={() => (window.location.href = "/additem")}
            >
              Add New Item
            </p>
            <br />
            <p
              className="Innav_item"
              onClick={() => (window.location.href = "/addinform")}
            >
              Inform Supplier
            </p>
            <br />
            <p
              className="Innav_item"
              onClick={() => (window.location.href = "/addallocate")}
            >
              Allocate
            </p>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
