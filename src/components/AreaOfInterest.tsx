import React from 'react'
import '../views/AreaOfInterest.css';

const AreaOfInterest = () => {

  return (
    <div id="interests">
      <h1>Personal Area of Interests</h1>
      <span className="label music">Music</span>
      <span className="label travel">Travel</span>
      <span className="label web">Web Programming</span>
      <span className="label yoga">Yoga</span>
      <span className="label dog">Dogs</span>
      <span className="label fashion">Fashion</span>
    </div>
  );
};

export default AreaOfInterest;