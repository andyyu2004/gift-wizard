import React, { useState, useEffect } from 'react'
import { Cell } from '../../components';
import { navigate } from '@reach/router';
import { Friend, User } from 'shared/types';
import API from '../../api';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { AppState } from '../../reducers';

type PropType = {
  filterFriends: boolean;
};

const Connections: React.FC<PropType> = ({ filterFriends }) => {
  const [people, setPeople] = useState<User[]>([]);
  const user = useSelector<AppState, User>(state => state.user.user!);

  useEffect(() => {
    if (filterFriends) {
      (async () => (await API.getFriends(user._id))
        .map(setPeople)
        .mapLeft(toast.error))();
    } else {
      // Fetch all users
      (async () => (await API.getAllUsers())
        .map(p => {
          setPeople(p)
        })
        .mapLeft(toast.error))();
    }
  }, [filterFriends, user._id]);

  return (
    <div style={{ overflowWrap: "normal" }}>
      {people.map(({ username, picture, bio, _id }) => 
        <div style={{ display: "inline-block" }}>
          <Cell key={_id} text={`${username}`} image={picture} onClick={() => navigate(`/people/${_id}`)} />
        </div>
      )}
    </div>
  );
};

export default Connections;


