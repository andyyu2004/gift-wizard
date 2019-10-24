import React from 'react'
import "./Sidebar.css";
import {Tab, Row, Nav} from 'react-bootstrap';


type PropTypes = {
  img?: string,
  text?: string,
  entries?: [string, () => void][],
};

const Sidebar: React.FC<PropTypes> = ({ img, text, entries }) => {
  return (
    <div className="sidebar">
      <div className="user">
        <img src={img} alt="sidebarimage"/>
        <h6 className="userText">{text}</h6>
      </div>
      
      {entries && entries.map(([text, cb], i) => {
        return (
        <div className="tabs" onClick={cb} key={i}>
          <h5 className="tabText">{text}</h5>
        </div>
        )
      })}
    </div>
    /*
    <div className="sidebar">
      <img src={img} alt="sidebarimage"/>
      <h6>{text}</h6>

      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        {entries && entries.map(([text, cb]) => 
          <Row id="sidebar">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first" onClick={cb}>{text}</Nav.Link>
              </Nav.Item>
            
            </Nav>
          </Row>)}
    
      </Tab.Container>
    </div>
    */
  );
};

export default Sidebar;