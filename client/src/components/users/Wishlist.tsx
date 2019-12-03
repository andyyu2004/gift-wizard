import React, { useState, MouseEvent } from 'react';
import { toast } from 'react-toastify';
import { User } from 'shared/types';
import { updateUser } from '../../actions/actionCreaters';
import API from '../../api';
// import '../../views/userprofile/People.css';
import { compose } from '../../util/functional';
import { useDispatch } from 'react-redux';
import './Wishlist.css';
import deleteimg from '../../images/cancel_icon.png';

type PropType = {
  wishlist: string[],
};

const Wishlist: React.FC<PropType> = ({ wishlist }) => {
  const [myWishlist, setmyWishlist] = useState(wishlist);
  const [newItem, setNewItem] = useState("");

  const dispatch = useDispatch();

  const saveWishlist = async () => {
    (await API.patchUser({ wishlist: myWishlist }))
      .map(user => {
        compose(dispatch, updateUser)(user);
        return toast.success("Successfully updated wishlist")
      })
      .mapLeft(toast.error);
  };

  const addItem = (e: MouseEvent<HTMLElement>, item: string) => {
    e.preventDefault();
    if (myWishlist.find(x => x === item)) return toast.error("Cannot have duplicate entries in wishlist");
    setNewItem("");
    setmyWishlist([...myWishlist, item]);
  };

  const removeItem = (item: string) => setmyWishlist(myWishlist.filter(x => x !== item ));

  return (
    <div>
      <div id="show-wishlist" className="wishView">
        <h6> Personal Wish List </h6>
        <form>
          <input type="text" value={newItem} onChange={e => setNewItem(e.target.value)}/> 
          <button className="addWish" type="submit" onClick={e => addItem(e, newItem)}>Add Wish</button>
        </form>
        <ul>
        {myWishlist.map(wish =>
          <li key={wish}>
            {wish} 
            <img className="wishlistRemove" onClick={e => removeItem(wish)} src={deleteimg} />
          </li>)
        }
        </ul>
        <div>
          <button className="saveWishlist" onClick={() => {saveWishlist()}}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;