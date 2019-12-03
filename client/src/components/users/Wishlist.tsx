import React,{MouseEvent, useState} from 'react';
import { User } from 'shared/types';
import '../../views/userprofile/People.css';

type PropType = {
  user: User,
};


const saveWishlist=()=>{
  // TODO: change editable=false; save the wishlist and call backend to save i guess
}


const Wishlist: React.FC<PropType> = ({ user: { wishlist }}) => {
  const [myWishlist, setmyWishlist]=useState(wishlist)
  const [editable, setEditable]=useState(false);
  const [newItem, setNewItem]=useState("");
  const addItem=(Item: string)=>{
    myWishlist.push(Item)
    setmyWishlist(myWishlist)
  }
  const removeItem=(Item: string)=>{
    const newWishlist=myWishlist.filter((x)=>{return (x!=Item)})
    setmyWishlist(newWishlist)
  }
  return (
    <div>
      <div id="show-wishlist" className="peopleView">
        <h6> Personal Wish List </h6>
        <div>
          {editable && <div><input type="text" onChange={e => setNewItem(e.target.value)}/> <button onClick={e => addItem(newItem)}>Add wish</button></div>}
          {myWishlist.map(x =>
            <div key={x}>
              {x} 
              {editable && <button className="generic-button" onClick={e => removeItem(x)}>Remove</button>}
            </div>)
          }
      </div>
      <div>
        <button onClick={() => setEditable(true)}>
          Edit
        </button>
        <button onClick={() => {saveWishlist()}}> 
          Save
        </button>
      </div>
    </div>
  </div>
  );
};

export default Wishlist;