import React from 'react';
import { useSelector } from 'react-redux';
import { Notification, NotificationType, User } from 'shared/types';
import useSocket from '../hooks/useSocket';
import { AppState } from '../reducers';
import './DisplayNotifications.css';

type PropType = {
	notification: Notification,
};

const DisplayNotifications: React.FC<PropType> = ({ notification }) => {
	const { creationTime, msg, type, _id, sender } = notification;
	const socket = useSocket();
	const user = useSelector<AppState, User>(state => state.user.user!);

	const handleEvent = () => {
		switch (type) {
			case NotificationType.FriendReq:
				socket.emit('accept-f-req', sender);
				break;
			default:
				break;
		}

		handleDismiss();
	};

	const getActionName = () => {
		switch (type) {
			case NotificationType.FriendReq: return "Accept friend request"
			default: return "Ok";
		}
	};

	const handleDismiss = () => socket.emit('dismiss', _id);

	return (
		<div className="singleNotification">
			<h6>{creationTime}</h6>
			<h6>{msg}</h6>
			<button className='acceptFriendButton' onClick={handleEvent}>{getActionName()}</button>
			<button className='acceptFriendButton' onClick={handleDismiss}>Dismiss</button>
		</div>
	);
};

export default DisplayNotifications;
