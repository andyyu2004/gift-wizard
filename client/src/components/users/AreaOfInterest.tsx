import React, {MouseEvent, useState} from 'react';
import { getRandom } from '../../util/array';
import './AreaOfInterest.css';
import deleteimg from '../../images/cancel_icon.png';
import { toast } from 'react-toastify';
import API from '../../api';
import { updateUser } from '../../actions/actionCreaters';
import { useDispatch } from 'react-redux';

type PropType = {
  interests: string[],
};



const cssclasses = ["label music", "label travels", "label web", "label yoga", "label dog"];


const AreaOfInterest: React.FC<PropType> = ({ interests }) => {
  const [myInterests, setMyInterests]= useState(interests)
  const [newInterest, setNewInterest]= useState("")
  const dispatch = useDispatch();

  const addInterest = (e: MouseEvent<HTMLElement>, item: string) => {
    e.preventDefault();
    if (myInterests.find(x => x === item)) return toast.error("Cannot have duplicate interests");
    setNewInterest("");
    setMyInterests([...myInterests, item]);
  };

  const removeInterest = (item: string) => setMyInterests(myInterests.filter(x => x !== item ));

  const saveInterests = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    (await API.patchUser({ interests: myInterests }))
      .map(user => {
        dispatch(updateUser(user));
        toast.success("Successfuly updated interests");
      })
      .mapLeft(toast.error);
  };
  
  return (
    <div>
      <h5>Personal Area of Interests</h5>

      <form className="addInterest"> 
        <input type="text" value={newInterest} onChange={e => setNewInterest(e.target.value)}/>
        <input type="submit" value="Add Interest" className="addInterestButton" onClick={e =>addInterest(e, newInterest)} />
      </form>      

      <div className="interestButtons">
        <button className="saveInterestButton" onClick={saveInterests}>Save</button>
      </div>

      <div id="interests">
        {myInterests && myInterests.map((interest, i) => 
        <span key={i} className={getRandom(cssclasses)}>
          {interest} 
          <img onClick={e=>removeInterest(interest)} className="deleteInterest" src={deleteimg}/>
        </span>)}
      </div>

    </div>
  );
};

export default AreaOfInterest;




