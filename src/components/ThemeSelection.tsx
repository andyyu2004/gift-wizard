import React from 'react'
import christmas_pattern from '../images/pattern1.jpg';
import pink_pattern from '../images/pink_triangle_pattern.webp';

const backgrounds = [
  christmas_pattern,
  pink_pattern,
];

type PropType = {
    setBackground: React.Dispatch<string>,
};

const ThemeSelection: React.FC<PropType> = ({ setBackground }) => {
  return (
    <div className="themeContainer">
      <h6>Step1: Choose your theme</h6>
      {backgrounds.map(c => <img key={c} src={c} style={{backgroundImage: c, width: "80px", height: "80px" }} onClick={() => setBackground(c)}/>)}
    </div>
  );
};

export default ThemeSelection;