import React from 'react'
import './Cell.css';

type PropType = {
  image?: string, // path to image
  text?: string,
}

/**
 * Represents each cell/icon as seen in the Homepage View in the proposal
 * @param props 
 */
const Cell: React.FC<PropType> = props => {
  const { image, text } = props;
  return (
    <div className="cell">
      <img src={image} alt="img" />
      <h6 className="celltext">{text}</h6>
    </div>
  );
}

export default Cell;