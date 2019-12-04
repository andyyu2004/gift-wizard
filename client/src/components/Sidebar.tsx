import React from 'react'
import "./Sidebar.css";

type PropTypes = {
  img?: string,
  text?: string,
  entries?: [string, () => void][],
};

const Sidebar: React.FC<PropTypes> = ({ img, text, entries }) => {
  return (
    <div className="sidebar">
      <div className="user">
        <img src={img} alt="" style={{padding: "10px"}}/>
        <h6 className="userText">{text}</h6>
      </div>
      
      {entries && entries.map(([text, cb], i) => (
        <div className="tabs" onClick={cb} key={i}>
          <h5 className="tabText">{text}</h5>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;