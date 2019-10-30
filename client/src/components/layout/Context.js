import React from "react";
import contextImage from './contextMenuWhite.jpg';
import CustomToggle from './CustomToggle';
import CustomMenu from './CustomMenu';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControl from 'react-bootstrap/FormControl';

export default () => {
  return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          <img src={contextImage}></img>
        </Dropdown.Toggle>
    
        <Dropdown.Menu as={CustomMenu}>
          <Dropdown.Item eventKey="1">Red</Dropdown.Item>
          <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
          <Dropdown.Item eventKey="3" active>
            Orange
          </Dropdown.Item>
          <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
  );
};