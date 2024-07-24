import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Style from './Profile.module.css';

const Profile = () => {
  const [imageUrl, setImageUrl] = useState("https://via.placeholder.com/150/");
  const [view, setView] = useState('info');
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    profileImage: null,
  });

  //get info of the user
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user/Profile', {
          withCredentials: true
        });
        setUserData(response.data);
        setFormData({
          username: response.data.username || '',
          email: response.data.email || '',
          phone: response.data.phone || '',
        });
        if (response.data.image) {
          setImageUrl(response.data.image);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  //for updaate the image profile , and stored on the cloud
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'xk7hi46k'); 

      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dvnzzd8d5/image/upload', 
          formData
        );
        setImageUrl(response.data.secure_url);
        setFormData(prevState => ({
          ...prevState,
          profileImage: response.data.secure_url
        }));
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  //for Update the info the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:8000/user/EditeProfile', formData, {
        withCredentials: true
      });
      setUserData(response.data);
      setIsEditing(false);
      if (response.data.image) {
        setImageUrl(response.data.image);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };


  //change Password
  const initialFormState = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };
  const [formPassword, setFormPassword] = useState(initialFormState);
  const [messagePassword, setMessagePassword] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormPassword({ ...formPassword, [id]: value });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (formPassword.newPassword !== formPassword.confirmNewPassword) {
      setMessagePassword('New passwords do not match.');
      return;
    }
    try {
      const response = await axios.put('http://localhost:8000/user/changePassword', formPassword, {
        withCredentials: true,
      });
      setMessagePassword(response.data.message);
      if (response.data.status=='success'){
        setFormPassword(initialFormState);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setMessagePassword('Server error. Please try again later.');
    }
  };

  setTimeout(() => {
    setMessagePassword(false);
  }, 4000);

  return (
    <div className={Style.container}>
      <div className={Style.profileCard}>
        <div className={Style.imageContainer}>
          <img src={imageUrl} alt="Profile" className={Style.profileImage} />
          {isEditing && (
            <>
              <label htmlFor="imageUpload" className={Style.uploadIcon}>
                <img width="30" height="30" src="https://img.icons8.com/glyph-neue/64/ef5e4e/plus.png" alt="camera"/>
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </>
          )}
        </div>
        <h5>{userData?.username}</h5>
      </div>

      <div className={Style.right_box}>
        <div className={Style.navigation}>
          <button 
            onClick={() => setView('info')} 
            className={view === 'info' ? Style.active : ''}
          >
            Account Info
          </button>
          <button 
            onClick={() => setView('password')} 
            className={view === 'password' ? Style.active : ''}
          >
            Change Password
          </button>
        </div>

        {view === 'info' && (
          <div className={Style.settingsCard}>
            <form className={Style.form} onSubmit={handleSubmit}>
              <div className={Style.formRow}>
                <div className={Style.formGroup}>
                  <label htmlFor="username">Username</label>
                  <input 
                    type="text" 
                    id="username" 
                    value={isEditing ? formData.username : userData?.username || ''} 
                    onChange={handleInputChange}
                    readOnly={!isEditing} 
                  />
                </div>
              </div>
              <div className={Style.formRow}>
                <div className={Style.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    value={isEditing ? formData.phone : userData?.phone ||''} 
                    onChange={handleInputChange}
                    readOnly={!isEditing} 
                    pattern="[0-9]{3}[0-9]{3}[0-9]{4}" 
                    placeholder='Your number phone'
                  />
                </div>
                <div className={Style.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={isEditing ? formData.email : userData?.email || ''} 
                    onChange={handleInputChange}
                    readOnly={!isEditing} 
                  />
                </div>
              </div>
              {isEditing && (
                <div className={Style.buttonGroup}>
                  <button type="submit" className={Style.saveButton}>Save Changes</button>
                  <button type="button" className={Style.cancelButton} onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              )}
            </form>
            {!isEditing && (
              <button 
                className={Style.editeinfo} 
                onClick={() => setIsEditing(true)}
              >
                Edit Info
              </button>
            )}
          </div>
        )}

        {view === 'password' && (
          <div className={Style.passwordCard}>
              <form className={Style.form} onSubmit={handleChangePassword}>
                <div className={Style.formGroup}>
                  <label htmlFor="oldPassword">Old Password <span>*</span></label>
                  <input type="password" id="oldPassword" value={formPassword.oldPassword} onChange={handleChange} required />
                </div>
                <div className={Style.formGroup}>
                  <label htmlFor="newPassword">New Password <span>*</span></label>
                  <input type="password" id="newPassword" value={formPassword.newPassword} onChange={handleChange} required />
                </div>
                <div className={Style.formGroup}>
                  <label htmlFor="confirmNewPassword">Confirm New Password <span>*</span></label>
                  <input type="password" id="confirmNewPassword" value={formPassword.confirmNewPassword} onChange={handleChange} required />
                </div>
                {messagePassword && <p className={Style.messagePassword}>{messagePassword}</p>}
                <button type="submit" className={Style.saveButton}>Save</button>
              </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;