import { NavLink } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';








function Navl() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item>">
                <Dropdown>
<<<<<<< HEAD
                  <Dropdown.Toggle variant="light" id="inventory-dropdown">
                    Inventory
=======
                  <Dropdown.Toggle variant="light" id="dropdown">
                    Menu
>>>>>>> refs/remotes/origin/main
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/manufacturers">List Manufacturers</Dropdown.Item>
                    <Dropdown.Item href="/models">List Models</Dropdown.Item>
                    <Dropdown.Item href="/automobiles">List Automobiles</Dropdown.Item>
                      <React.Fragment>
                    <Dropdown.Item href="/manufacturers/new">Add Manufacturer</Dropdown.Item>
                    <Dropdown.Item href="/models/new">Add Model</Dropdown.Item>
                    <Dropdown.Item href="/automobiles/new">Add Automobile</Dropdown.Item>
                    </React.Fragment>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navl;
