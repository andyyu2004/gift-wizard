import React from 'react'
import { Friend } from '../types';
import { Cell } from '../components';
import { fakeusers } from '../mockdata/mockpeople';
import { navigate } from '@reach/router';

type PropType = {
  friends: Friend[]
};

const Connections: React.FC<PropType> = ({ friends }) => {
  return (
    <div className="flex-container">
      {friends.map(({relationship, userid}) => {
        const { picture, name } = fakeusers.find(x => x.userid === userid);
        return <Cell key={userid} text={name} subtext={relationship} image={picture} onClick={() => navigate(`/people/${userid}`)} />
      })}
    </div>
  );
};

export default Connections;


