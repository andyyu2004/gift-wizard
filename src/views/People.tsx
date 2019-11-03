import React from 'react'
import { fakeusers } from '../mockdata/mockpeople';
import { RouteComponentProps } from '@reach/router';
import './People.css';

type PropType = RouteComponentProps & {
  userid?: string,
};

const PeopleView: React.FC<PropType> = ({ userid }) => {
  const { firstname, surname, picture, wishlist, bio } = fakeusers.find(x => x.userid === userid) || {};
  return (
    <div className="peopleView">
      <h5><strong>{firstname} {surname}</strong></h5>
      <img src={picture} alt="profilepic" />
      <p>{bio}</p>
      {wishlist && wishlist.length !== 0 && 
        <div>
          <h6> ~~~ Wishlist ~~~</h6>
          <ul>
            {wishlist.map(x => <li key={x}>{x}</li>)}
          </ul>
        </div>
      }
    </div>
  );
};

export default PeopleView;