import React from 'react'
import { User } from '../types';
import '../views/People.css';

type PropType = {
  user: User,
};

const Wishlist: React.FC<PropType> = ({ user: { wishlist }}) => {
  return (
    <div id="show-wishlist">
      <div className="peopleView">
        {wishlist && wishlist.length !== 0 && 
          <div>
            <h6> Personal Wish List </h6>
            <ul>
              {wishlist.map(x => <li key={x}>{x}</li>)}
            </ul>
          </div>
        }
      </div>
    </div>
  );
};

export default Wishlist;