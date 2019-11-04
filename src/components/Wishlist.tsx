import React from 'react'
import { User } from '../types';

type PropType = {
  user: User,
};

const Wishlist: React.FC<PropType> = ({ user: { wishlist }}) => {
  return (
    <div>
      <h5>Wish List</h5>
      {wishlist.map((item, i) => <>
        <input key={i} value={item} onChange={() => {}} />
        <br /></>
      )}
    </div>
  );
};

export default Wishlist;
