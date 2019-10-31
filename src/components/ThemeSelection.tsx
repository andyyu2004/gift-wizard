import React from 'react'


const colours = ["black", "grey", "blue", "green", "red", "yellow"];

type PropType = {
    setBackground: React.Dispatch<string>,
};

const ThemeSelection: React.FC<PropType> = ({ setBackground }) => {
  return (
    <div className="flex-container">
      <h6>Step1: Choose your theme</h6>
      {colours.map(c => <button key={c} style={{backgroundColor: c, width: "80px", height: "80px" }} onClick={() => setBackground(c)}/>)}
    </div>
  );
};

export default ThemeSelection;