import React, { useState, MouseEvent } from 'react'
import './PersonalProfile.css';
import { User } from 'shared/types';
import API from '../../api';
import { toast } from 'react-toastify';
import { setUser, updateUser } from '../../actions/actionCreaters';
import { useDispatch } from 'react-redux';
import { toBase64 } from '../../util/encoding';

type PropType = {
	user: User,
};

/** Subview of Profile */
const PersonalProfile: React.FC<PropType> = ({ user }) => {
	const { username, bio, firstname, surname, picture, email, phonenumber, country, province, city } = user;
	
	//added these three
	const [showUploadPhoto, setShowUploadPhoto]= useState(false);

	const [username_, setUsername] = useState(username);
	const [bio_, setBio] = useState(bio);
	const [firstname_, setFirstname] = useState(firstname);
	const [surname_, setSurname] = useState(surname);
	const [email_, setEmail] = useState(email);
	const [phonenumber_, setPhoneNumber] = useState(phonenumber);
	const [country_, setCountry] = useState(country);
	const [province_, setProvince] = useState(province);
	const [city_, setCity] = useState(city);

	const dispatch = useDispatch();
	
	const handlePatchUser = async (e: MouseEvent<HTMLElement>) => {
		e.preventDefault();
		(await API.patchUser({
			...user,
			username: username_,
			bio: bio_,
			firstname: firstname_,
			surname: surname_,
			email: email_,
			phonenumber: phonenumber_,
			country: country_,
			province: province_,
			city: city_,
		})).map(user => {
			dispatch(updateUser(user));
			return toast.success("Successfullly updated user profile");
		}).mapLeft(toast.error);
	};

	const updatePicture = async (files: any) => {
		const picture = files[0];
		const encoded = await toBase64(picture);
		(await API.patchUser({ picture: encoded }))
			.map(user => {
				dispatch(updateUser(user));
				setShowUploadPhoto(false);
				return toast.success("Successfully Updated Profile Picture")
			})
			.mapLeft(toast.error);
	};

	return (
		<div className="personal-profile-container">
			<div className="profileInfo">
				<img src={picture} className="profilePicture" alt="profilepicture" />
				<button type="button" id="changeProfile" onClick={e=>setShowUploadPhoto(!showUploadPhoto)}><strong>Change Profile Photo</strong></button>
				{showUploadPhoto && 
					<div className="uploadPhoto"> 
						<input type="file" accept="image/jpg,image/png,image/jpeg,image/gif" required  multiple={false} onChange={e => updatePicture(e.target.files)}/>
					</div>
				}
			</div>
			<div className="profileInfo">
				<h5 className="sectionTitle">Personal Information</h5>
				<form className="forms">
					<fieldset className="groupFields">
						<label><strong>First Name:</strong>
							<input type="text" id="fname" name="name" value={firstname_} onChange={e => setFirstname(e.target.value)} />
						</label>
						<label><strong>Last Name:</strong>
							<input type="text" id="lname" name="name" value={surname_} onChange={e => setSurname(e.target.value)} />
						</label>
						<label><strong>Username:</strong>
							<input type="text" id="username" name="username" value={username_} onChange={e => setUsername(e.target.value)} />
						</label>
					</fieldset>
					<fieldset className="groupFields">
						<label><strong>Bio:</strong>
							<textarea id ="bio" value={bio_} placeholder="Tell them a little about yourself!" rows={2} cols={70} onChange={e => setBio(e.target.value)} />
						</label>
					</fieldset>
					<fieldset className="groupFields">
						<label><strong>Email:</strong>
							<input type="text" id="email" name="email" value={email_} onChange={e => setEmail(e.target.value)} />
						</label>
						<label><strong>Phone Number:</strong>
							<input type="text" id="phone" name="phone" value={phonenumber_} onChange={e => setPhoneNumber(e.target.value)} />
						</label>
					</fieldset>
					<fieldset className="groupFields">
						<label><strong>DOB:</strong>
							<input type="date" id="dob" name="bday" onChange={() => {}} />
						</label>
					</fieldset>
					<fieldset className="groupFields">
						<label><strong>Country:</strong>
							<input type="text" id="country" name="country" value={country_} onChange={e => setCountry(e.target.value)} />
						</label>
						<label><strong>Province/State:</strong>
							<input type="text" id="state" name="state" value={province_} onChange={e => setProvince(e.target.value)} />
						</label>
						<label><strong>City:</strong>
							<input type="text" id="city" name="city" value={city_} onChange={e => setCity(e.target.value)} />
						</label>
					</fieldset>
					<button type="button" className="saveForm" onClick={handlePatchUser}>Save Profile</button>
				</form>
			</div>
		</div>
  );
};

export default PersonalProfile;