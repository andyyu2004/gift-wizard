import React from 'react'
import { Friend } from '../../types';
import { Cell } from '../../components';
import { fakeusers } from '../../mockdata/mockpeople';
import { navigate } from '@reach/router';

type PropType = {
  friends: Friend[]
};

const Connections: React.FC<PropType> = ({ friends }) => {
  return (
    <div className="flex-container">
      {friends.map(({relationship, userid}) => {
        const { picture, firstname, surname } = fakeusers.find(x => x._id === userid) || {};
        return <Cell key={userid} text={`${firstname} ${surname}`} subtext={relationship} image={picture} onClick={() => navigate(`/people/${userid}`)} />
      })}
    </div>
  );
};

export default Connections;


