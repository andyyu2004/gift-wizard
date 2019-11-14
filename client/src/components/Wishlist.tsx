import React from 'react'
import { User } from 'shared/types';
import '../views/People.css';

type PropType = {
  user: User,
};

const Wishlist: React.FC<PropType> = ({ user: { wishlist }}) => {
  return (
    <div id="show-wishlist" className="peopleView">
      <h6> Personal Wish List </h6>
      <ul>
        {wishlist.map(x => <li key={x}>{x}</li>)}
      </ul>
    </div>
  );
};

export default Wishlist;