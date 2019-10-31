import React from 'react'
import { fakeusers } from '../mockdata/mockpeople';

const PeopleView: any = ({ userid, navigate }) => {
  const { name, picture, wishlist, bio } = fakeusers.find(x => x.userid === userid);
  return (
    <div>
      <h5>{name}</h5>
      <img src={picture} />
      <p>{bio}</p>
      {wishlist.length !== 0 && 
        <div>
          <h6>Wishlist</h6>
          <ul>
            {wishlist.map(x => <li key={x}>{x}</li>)}
          </ul>
        </div>
      }
    </div>

  );
};

export default PeopleView;