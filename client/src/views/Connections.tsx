import React from 'react'
import { Cell } from '../components';
import { fakeusers } from '../mockdata/mockpeople';
import { navigate } from '@reach/router';
import { Friend } from 'shared/types';

type PropType = {
  friendIds: string[]
};

const Connections: React.FC<PropType> = ({ friendIds }) => {
  const friends: Friend[] = []
  return (
    <div className="flex-container">
      {friends.map(({ relationship, userid }) => {
        const { picture, firstname, surname } = fakeusers.find(x => x._id === userid) || {};
        return <Cell key={userid} text={`${firstname} ${surname}`} subtext={relationship} image={picture} onClick={() => navigate(`/people/${userid}`)} />
      })}
    </div>
  );
};

export default Connections;


