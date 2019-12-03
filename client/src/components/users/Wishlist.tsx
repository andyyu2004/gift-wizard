import React, { useState, MouseEvent } from 'react';
import { toast } from 'react-toastify';
import { User } from 'shared/types';
import { updateUser } from '../../actions/actionCreaters';
import API from '../../api';
import '../../views/userprofile/People.css';
import { compose } from '../../util/functional';
import { useDispatch } from 'react-redux';

type PropType = {
  user: User,
};

const Wishlist: React.FC<PropType> = ({ user: { wishlist }}) => {
  const [myWishlist, setmyWishlist] = useState(wishlist)
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
    setmyWishlist([...myWishlist, item]);
  };

  const removeItem = (item: string) => setmyWishlist(myWishlist.filter(x => x !== item ));

  return (
    <div>
      <div id="show-wishlist" className="peopleView">
        <h6> Personal Wish List </h6>
        <form>
          <input type="text" onChange={e => setNewItem(e.target.value)}/> 
          <input type="submit" onClick={e => addItem(e, newItem)} value="Add Wish" />
        </form>
        <ul>
        {myWishlist.map((x, i) =>
          <li key={i}>
            {x} 
            <button className="generic-button" onClick={e => removeItem(x)}>Remove</button>
          </li>)
        }
        </ul>
      </div>
      <div>
        <button onClick={() => {saveWishlist()}}>Save</button>
      </div>
    </div>
  );
};

export default Wishlist;