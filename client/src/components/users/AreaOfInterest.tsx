import React, {MouseEvent, useState} from 'react';
import { getRandom } from '../../util/array';
import './AreaOfInterest.css';
import deleteimg from '../../images/cancel_icon.png';

type PropType = {
  interests: string[],
};

const cssclasses = ["label music", "label travels", "label web", "label yoga", "label dog"];

const AreaOfInterest: React.FC<PropType> = props => {
  const [interests, setInterests] = useState(props.interests);
  const addInterest = (x: string) => setInterests([...interests, x]);
  const removeInterest = (x: string) => setInterests(interests.filter(t => t !== x));

  return (
    <div>
      <div id="interests">
        {interests && interests.length !== 0 && <h5>Personal Area of Interests</h5>}
        {interests && interests.map(interest => 
        <span key={interest} className={getRandom(cssclasses)}>
          {interest} 
          <img onClick={()=>{}} className="deleteInterest" src={deleteimg}/>
        </span>)}
      </div>
      <div className="addInterest"> 
        <input type="text" onChange={_ => addInterest}/>
        <button className="addInterestButton" onClick={() =>{/* add an interest*/}}>Add Interest</button>
      </div>
      <div className="interestButtons">
        <button className="saveInterestButton" onClick={() => {}}>Save</button>
      </div>
    </div>
  );
};

export default AreaOfInterest;