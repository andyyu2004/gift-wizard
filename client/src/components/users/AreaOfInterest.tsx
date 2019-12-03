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
  const [myInterests, setMyInterests]= useState(interests)
  const [newInterest, setnewInterest]= useState("")
  
  const addInterest = (e: MouseEvent<HTMLElement>, item: string) => {
    e.preventDefault();
    setMyInterests([...myInterests, item]);
  };

  const removeInterest = (item: string) => setMyInterests(myInterests.filter(x => x !== item ));
  
  return (
    <div>
      <div id="interests">
        {myInterests && myInterests.length !== 0 && <h5>Personal Area of Interests</h5>}
        {myInterests && myInterests.map((interest, i) => 
        <span key={i} className={getRandom(cssclasses)}>
          {interest} 
          {editable && <img onClick={e=>removeInterest(interest)} className="deleteInterest" src={deleteimg}/>}
        </span>)}
        {/* <span className="label music">Music</span>
        <span className="label travel">Travel</span>
        <span className="label web">Web Programming</span>
        <span className="label yoga">Yoga</span>
        <span className="label dog">Dogs</span> */}
      </div>
      {editable && 
        <div className="addInterest"> 
          <input type="text" onChange={e => setnewInterest(e.target.value)}/>
          <button className="addInterestButton" onClick={e =>addInterest(e, newInterest)}>Add Interest</button>
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