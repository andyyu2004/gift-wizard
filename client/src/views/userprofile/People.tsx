import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { User } from 'shared/types';
import API from '../../api';
import { AreaOfInterest } from '../../components/users';
import './People.css';
import { withProtection } from '../../components/hoc';
import useSocket from '../../hooks/useSocket';
import { useSelector } from 'react-redux';
import { AppState } from '../../reducers';

type PropType = RouteComponentProps & {
  userid?: string,
};

const PeopleView: React.FC<PropType> = ({ userid }) => {
  const [user, setUser] = useState<User>();
  const { _id, username, firstname, surname, picture, wishlist, bio, interests, friends } = user || {};

  const [disableRequest, setDisableRequest] = useState(false);
  const socket = useSocket();

  const me = useSelector<AppState, User>(state => state.user.user!);
  const isFriend = me.friends.includes(_id || "");

  const sendFriendReq = () => {
    socket.emit('send-f-req', _id);
    setDisableRequest(true);
  };
  
  useEffect(() => { 
    (async () => (await API.getUser(userid!))
      .map(setUser)
      .mapLeft(toast.error))()
  }, []);

  return (
    <div className="peopleView">
      <h4>{username}</h4>
      <h5><strong>{firstname} {surname}</strong></h5>
      <img src={picture} alt="profilepic" />
      <p>{bio}</p>
      {
        isFriend || _id == me._id
          ? <h6>You are friends!</h6>
          : <button className="generic-button" onClick={sendFriendReq} disabled={disableRequest}>Send friend request</button>
      }
      
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

export default withProtection(PeopleView);