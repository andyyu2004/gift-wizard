import React from 'react'
import usericon from '../images/fake_user_profile.jpeg';
import './PersonalProfile.css';

/** Subview of Profile */
const PersonalProfile = props => {

    return (
	  	<div>
		  	<div className="profileInfo">
		  		<img src={usericon} className="profilePicture" />
		   		<button type="button" id="changeProfile"><strong>Change Profile Photo</strong></button>
		    </div>
		    <div className="profileInfo">
		    	<h5 className="sectionTitle">Personal Information</h5>
		    	<form className="forms">
		    		<fieldset className="groupFields">
					    <label><strong>First Name:</strong>
					    	<input type="text" id="fname" name="name" defaultValue="Billy"/>
					  	</label>
					  	<label><strong>Last Name:</strong>
					  		<input type="text" id="lname" name="name" defaultValue="Eilish"/>
				  		</label>
					  	<label><strong>Username:</strong>
					  		<input type="text" id="username" name="username" defaultValue="Eilish_1031"/>
					  	</label>
				  	</fieldset>
				  	<fieldset className="groupFields">
					  	<label><strong>Bio:</strong>
					  		<textarea id ="bio" placeholder="Tell them a little about yourself!" rows="2" cols="70"></textarea>
					  	</label>
				  	</fieldset>
				  	<fieldset className="groupFields">
					  	<label><strong>Email:</strong>
					  		<input type="text" id="email" name="email" defaultValue="bil_eilish1031@gmail.com"/>
					  	</label>
					  	<label><strong>Phone Number:</strong>
					  		<input type="text" id="phone" name="phone" defaultValue="6476029798"/>
					  	</label>
				  	</fieldset>
				  	<fieldset className="groupFields">
					  	<label><strong>DOB:</strong>
					  		<input type="date" id="dob" name="bday"/>
					  	</label>
				  	</fieldset>
				  	<fieldset className="groupFields">
					    <label><strong>Country:</strong>
					    	<input type="text" id="country" name="country" defaultValue="Canada"/>
					  	</label>
					  	<label><strong>Province/State:</strong>
					  		<input type="text" id="state" name="state" defaultValue="Ontario"/>
				  		</label>
					  	<label><strong>City:</strong>
					  		<input type="text" id="city" name="city" defaultValue="Toronto"/>
					  	</label>
				  	</fieldset>
				  	<button type="button" id="saveForm">Save Profile</button>
				</form>
		    </div>
	    </div>
  );
};

export default PersonalProfile;