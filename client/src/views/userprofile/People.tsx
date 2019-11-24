import React from 'react'
import { fakeusers } from '../../mockdata/mockpeople';
import { RouteComponentProps } from '@reach/router';
import './People.css';
import { AreaOfInterest } from '../../components/users';

type PropType = RouteComponentProps & {
  userid?: string,
};

const PeopleView: React.FC<PropType> = ({ userid }) => {
  const { firstname, surname, picture, wishlist, bio, interests } = fakeusers.find(x => x._id === userid) || {};

  return (
    <div className="peopleView">
      <h5><strong>{firstname} {surname}</strong></h5>
      <img src={picture} alt="profilepic" />
      <p>{bio}</p>
      {wishlist && 
        <div>
          <h6> ~~~ Wishlist ~~~</h6>
          <ul>
            {wishlist.map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </div>
      }
      <AreaOfInterest interests={interests || []} />
    </div>
  );
};

export default PeopleView;