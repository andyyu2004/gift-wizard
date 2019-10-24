import React from 'react'
import './Cell.css';

type PropType = {
  image?: string, // path to image
  text?: string,
  subtext?: string,
  onClick?: () => void,
}

/**
 * Represents each cell/icon as seen in the Homepage View in the proposal
 * @param props 
 */
const Cell: React.FC<PropType> = ({ image, text, subtext, onClick }) => {
  return (
    <div className="cell" onClick={onClick}>
      <img src={image} alt="img" />
      <h6 className="cell-text"><b>{text}</b></h6>
      <h6 className="cell-text">{subtext}</h6>
    </div>
  );
}

export default Cell;