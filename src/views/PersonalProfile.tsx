import React from 'react'
import './PersonalProfile.css';
import { User } from '../types';

type PropType = {
	user: User,
};

/** Subview of Profile */
const PersonalProfile: React.FC<PropType> = ({ user: { userid, bio, firstname, surname, picture, email, phonenumber, date, country, province, city }}) => {
	return (
		<div>
			<div className="profileInfo">
				<img src={picture} className="profilePicture" alt="profilepicture" />
				<button type="button" id="changeProfile"><strong>Change Profile Photo</strong></button>
			</div>
			<div className="profileInfo">
				<h5 className="sectionTitle">Personal Information</h5>
				<form className="forms">
					<fieldset className="groupFields">
						<label><strong>First Name:</strong>
							<input type="text" id="fname" name="name" value={firstname} />
						</label>
						<label><strong>Last Name:</strong>
							<input type="text" id="lname" name="name" value={surname} />
						</label>
						<label><strong>Username:</strong>
							<input type="text" id="username" name="username" value={userid} />
						</label>
					</fieldset>
					<fieldset className="groupFields">
						<label><strong>Bio:</strong>
							<textarea id ="bio" value={bio} placeholder="Tell them a little about yourself!" rows={2} cols={70}></textarea>
						</label>
					</fieldset>
					<fieldset className="groupFields">
						<label><strong>Email:</strong>
							<input type="text" id="email" name="email" value={email} />
						</label>
						<label><strong>Phone Number:</strong>
							<input type="text" id="phone" name="phone" value={phonenumber} />
						</label>
					</fieldset>
					<fieldset className="groupFields">
						<label><strong>DOB:</strong>
							<input type="date" id="dob" name="bday" />
						</label>
					</fieldset>
					<fieldset className="groupFields">
						<label><strong>Country:</strong>
							<input type="text" id="country" name="country" value={country} />
						</label>
						<label><strong>Province/State:</strong>
							<input type="text" id="state" name="state" value={province} />
						</label>
						<label><strong>City:</strong>
							<input type="text" id="city" name="city" value={city} />
						</label>
					</fieldset>
					<button type="button" id="saveForm">Save Profile</button>
				</form>
			</div>
		</div>
  );
};

export default PersonalProfile;