import React, {MouseEvent, useState} from 'react';
import { getRandom } from '../../util/array';
import './AreaOfInterest.css';
import deleteimg from '../../images/cancel_icon.png';

type PropType = {
  interests: string[],
};

const cssclasses = ["label music", "label travels", "label web", "label yoga", "label dog"];

const AreaOfInterest: React.FC<PropType> = ({ interests }) => {
  const [editable, setEditable]=useState(false);
  return (
    <div>
      <div id="interests">
        {interests && interests.length !== 0 && <h5>Personal Area of Interests</h5>}
        {interests && interests.map((interest, i) => 
        <span key={i} className={getRandom(cssclasses)}>
          {interest} 
          {editable && <img onClick={()=>{}} className="deleteInterest" src={deleteimg}/>}
        </span>)}
        {/* <span className="label music">Music</span>
        <span className="label travel">Travel</span>
        <span className="label web">Web Programming</span>
        <span className="label yoga">Yoga</span>
        <span className="label dog">Dogs</span> */}
      </div>
      {editable && 
        <div className="addInterest"> 
          <input type="text" onChange={e => {/*input a interest*/}}/>
          <button className="addInterestButton" onClick={() =>{/* add an interest*/}}>Add Interest</button>
        </div>
      }
      <div className="interestButtons">
        <button className="editInterestButton" onClick={() => setEditable(true)}>Edit</button>
        <button className="saveInterestButton" onClick={() => setEditable(false)}>Save</button>
      </div>
    </div>
  );
};

export default AreaOfInterest;