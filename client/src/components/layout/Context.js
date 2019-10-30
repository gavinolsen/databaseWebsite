import React from "react";
import contextImage from './contextMenuWhite.jpg';
import CustomToggle from './CustomToggle';
import CustomMenu from './CustomMenu';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

export default () => {

  function firstSelected() {
    console.log('first item selected');
  }

  function secondSelected() {
    console.log('second item selected');
  }

  function thirdSelected() {
    console.log('third item selected');
  }

  return (
      <Dropdown alignRight>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          <img src={contextImage}></img>
        </Dropdown.Toggle>
    
        <Dropdown.Menu as={CustomMenu}>
          <Dropdown.Item eventKey="1" onSelect={firstSelected}>
          <Link
              to='/requestlist'
              style={{
                color: 'gray',
                fontSizeAdjust: '-moz-initial',
                fontSize: '30px'
                }}
               >
              Lists
            </Link>
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" onSelect={secondSelected}>Blue</Dropdown.Item>
          <Dropdown.Item eventKey="1" onSelect={thirdSelected}>Red-Orange</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
  );
};