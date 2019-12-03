import React,{MouseEvent} from 'react';
import { User } from 'shared/types';
import '../../views/userprofile/People.css';

type PropType = {
  user: User,
};

const handleRemoveWishlist = (e: MouseEvent<HTMLElement>, x: string) => {
  e.preventDefault();
  /* TODO: remove the wishlist item */
};
const saveWishlist=()=>{
  // TODO: change editable=false; save the wishlist and call backend to save i guess
}
const handleAddWishlist = (e: MouseEvent<HTMLElement>/*, newItem: string*/)=>{
  e.preventDefault();
  //add a new wishlist item
}

const Wishlist: React.FC<PropType> = ({ user: { wishlist }}) => {
  let editable = false;/*how to set the state?*/
  return (
    <div>
      <div id="show-wishlist" className="peopleView">
        <h6> Personal Wish List </h6>
        <div>
          {wishlist.map(x => 
            <div key={x}>
              {x} 
              {editable && <button className="generic-button" onClick={e => handleRemoveWishlist(e, x)}>Remove</button>}
            </div>)
          }
          {editable && <div><input type="text"/> <button onClick={e => handleAddWishlist(e/*, newItem*/)}>Add wish</button></div>}
      </div>
      <div>
        <button onClick={() => {editable=true /* seem that this not working*/}}>
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