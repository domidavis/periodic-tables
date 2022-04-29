import React from "react";

import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <nav className="navbar fixed-top navbar-expand-md navbar-dark domi-the-boss-bar ">
      <Link
          className="navbar-brand"
          to="/"
        >
          <div className="sidebar-brand-text mx-3">
            <span>Periodic Tables</span>
          </div>
        </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarsExample04">
        <ul className="navbar-nav  ">
          <li className="nav-item active">
            <Link className="nav-link" to="/dashboard">
              <span className="oi oi-dashboard" />
              &nbsp;Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reservations/new">
              <span className="oi oi-plus" />
              &nbsp;New Reservation
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tables/new">
              <span className="oi oi-layers" />
              &nbsp;New Table
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link" to="/search">
              <span className="oi oi-magnifying-glass" />
              &nbsp;Search
            </Link>
          </li>          
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
