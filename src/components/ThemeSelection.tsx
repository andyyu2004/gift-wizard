import React from 'react';
//import icecream_pattern from '../images/icecream_pattern.png';
//import orange_pattern from '../images/orange_pattern.png';
import christmas_pattern from '../images/pattern1.jpg';
import pattern2 from '../images/pattern2.jpg';
import pattern3 from '../images/pattern3.jpg';
import pattern4 from '../images/pattern4.jpg';
import greybackground from '../images/grey_background.jpg';

//import red_heart_pattern from '../images/red_heart_pattern.png';
import "./ThemeSelection.css";

const backgrounds = [
  pattern2,
  pattern3,
  pattern4,
  christmas_pattern,
  greybackground,
  //icecream_pattern,
  //red_heart_pattern,
  //orange_pattern
];

type PropType = {
    setBackground: React.Dispatch<string>,
};

const ThemeSelection: React.FC<PropType> = ({ setBackground }) => {
  const imgStyle = (backgroundImage: string) => ({
    backgroundImage, 
    width: "60px", 
    height: "60px", 
    borderRadius: "10px", 
    marginLeft: "10px", 
    marginRight: "10px"
  });

  return (
    <div className="themeContainer">
      <h6>Step1: Choose your theme</h6>
      {backgrounds.map(c => 
        <img 
          key={c} src={c} 
          style={imgStyle(c)}
          alt="themeoption"
      onClick={() => setBackground(c)}/>)}
    </div>
  );
};

export default ThemeSelection;