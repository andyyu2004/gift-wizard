/** A component representing a row of cells */ 

import React from 'react'
import './CellRow.css';

const RowContainer = ({ title, subtitle, children }) => {
  return (
    <div id="cellRow">
      <h5 id="title">{title}</h5>
      <h6 id="subtitle">{subtitle}</h6>
      {children}
    </div>
  );
};

export default RowContainer;