import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div>
      <div className="row-md-2" style={{ backgroundColor: "#1f424b" }}>
        <Menu />
      </div>

      <div className="container">
        <div className="row-12 h-100">
        {/* <div className="col-md-2 side-bar">
          <Menu />
        </div> */}
          <div className="col">
            <Routes />
          </div>
        </div>
      </div>
    </div>
    
    
  );
}

export default Layout;
