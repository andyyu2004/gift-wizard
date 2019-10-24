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
      <img src={img} />
      <h6>{text}</h6>
      {entries && entries.map(([text, cb], i) => {
        return <h5 onClick={cb} key={i}>{text}</h5>
      })}
    </div>
  );
};

export default Sidebar;