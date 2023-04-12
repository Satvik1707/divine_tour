import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, ListGroup, } from "react-bootstrap";

// icons
import { BiHomeAlt, BiBeenHere, BiMoviePlay, BiImageAlt, BiLogOut } from 'react-icons/bi';

export default function LeftSideBar() {

  // state
  const [menuItem] = useState([
    {
      id: 1,
      link: '/dashboard',
      activeStatus: true,
      name: "Dashboard",
      icon: <BiHomeAlt className='me-2' />
    },
    {
      id: 2,
      link: '/places',
      activeStatus: false,
      name: "Places",
      icon: <BiBeenHere className='me-2' />
    },
    {
      id: 3,
      link: '/hospitals',
      activeStatus: false,
      name: "Hospitals",
      icon: <BiImageAlt className='me-2' />
    },
    {
      id: 4,
      link: '/',
      activeStatus: false,
      name: "Logout",
      icon: <BiLogOut className='me-2' />
    }
  ]);

  // current link
  let currentUrlLast = window.location.href.split("/").pop();
  let currentUrlLastPart = currentUrlLast.charAt(0).toUpperCase() + currentUrlLast.slice(1);

  return (
    <Col md={3} className='mb-md-0 mb-3'>
      <ListGroup className="left-menu">

        {menuItem && menuItem.map(item => (
          <ListGroup.Item className={ item.name === currentUrlLastPart ? "active" : "" } key={ item.id } >
            <Link to={ item.link }>
              {item.icon} { item.name }
            </Link>
          </ListGroup.Item>
        ))}
        
      </ListGroup>
    </Col>
  )
}
