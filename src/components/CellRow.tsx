/** A component representing a row of cells */ 

import React from 'react'

const RowContainer = ({ title, subtitle, children }) => {
  return (
    <div>
      <h5>{title}</h5>
      <h6>{subtitle}</h6>
      {children}
    </div>
  );
};

export default RowContainer;