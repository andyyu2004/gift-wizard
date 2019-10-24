import React from 'react'
import { Friend } from '../types';
import { Cell } from '../components';

type PropType = {
  friends: Friend[]
};


const Connections: React.FC<PropType> = ({ friends }) => {
  return (
    <div className="flex-container">
      {friends.map(({name, relationship, picture}) => <Cell text={name} subtext={relationship} image={picture} />)}
    </div>
  );
};

export default Connections;


