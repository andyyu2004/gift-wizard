import React from 'react';
import { getRandom } from '../../util/array';
import './AreaOfInterest.css';

type PropType = {
  interests: string[],
};

const cssclasses = ["label music", "label travels", "label web", "label yoga", "label dog"];

const AreaOfInterest: React.FC<PropType> = ({ interests }) => {
  return (
    <div id="interests">
      {interests && interests.length !== 0 && <h5>Personal Area of Interests</h5>}
      {interests && interests.map((interest, i) => <span key={i} className={getRandom(cssclasses)}>{interest}</span>)}
      {/* <span className="label music">Music</span>
      <span className="label travel">Travel</span>
      <span className="label web">Web Programming</span>
      <span className="label yoga">Yoga</span>
      <span className="label dog">Dogs</span> */}
    </div>
  );
};

export default AreaOfInterest;