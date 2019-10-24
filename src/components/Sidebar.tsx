import React from 'react'
import "./Sidebar.css";
import {Tabs, TabContainer, TabPane, Tab, Row, Col, Nav} from 'react-bootstrap';


type PropTypes = {
  img?: string,
  text?: string,
  entries?: [string, () => void][],
};

const Sidebar: React.FC<PropTypes> = ({ img, text, entries }) => {
  return (
    /*
    <div className="sidebar">
      <img src={img} alt="sidebarimage"/>
      <h6>{text}</h6>
      {entries && entries.map(([text, cb], i) => {
        return <h5 onClick={cb} key={i}>{text}</h5>
      })}
    </div>
    */
    <div>
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
    
      {entries && entries.map(([text, cb]) => 
        <Row>
        <Nav variant="pills" className="flex-column">
          <Nav.Item>
            <Nav.Link onClick={cb}>{text}</Nav.Link>
          </Nav.Item>
        
        </Nav>

    </Row>)}
    
  </Tab.Container>
  </div>
  );
};

export default Sidebar;