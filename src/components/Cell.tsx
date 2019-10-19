import React from 'react'


type PropType = {
  image: string, // path to image
  text?: string,
}

/**
 * Represents each cell/icon as seen in the Homepage View in the proposal
 * @param props 
 */
const Cell: React.FC<PropType> = props => {
  const { image, text } = props;
  return (
    <div></div>
  );
}

export default Cell;