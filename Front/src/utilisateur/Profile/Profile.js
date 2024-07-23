import React, { useState } from 'react';
import Style from './Profile.module.css';

const Profile = () => {
  const [imageUrl, setImageUrl] = useState("https://wallpapers.com/images/hd/cute-anime-profile-pictures-yufvetmuigla91hj.jpg");
  const [view, setView] = useState('info');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={Style.container}>
      <div className={Style.profileCard}>
        <div className={Style.imageContainer}>
          <img src={imageUrl} alt="Profile" className={Style.profileImage} />
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
        </div>
        <h5>Alaeddine</h5>
        <p>Agadir</p>
        {/* <button className={Style.viewProfile}>Edit Your image</button> */}
      </div>

      <div className={Style.right_box}>

      <div className={Style.navigation}>
        <button onClick={() => setView('info')} className={view === 'info' ? Style.active : ''}>Account Info</button>
        <button onClick={() => setView('password')} className={view === 'password' ? Style.active : ''}>Change Password</button>
      </div>

      {view === 'info' && (
        <div className={Style.settingsCard}>
          <form className={Style.form}>
            <div className={Style.formRow}>
              <div className={Style.formGroup}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" value="Tim" readOnly />
              </div>
              <div className={Style.formGroup}>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" value="Cook" readOnly />
              </div>
            </div>
            <div className={Style.formRow}>
              <div className={Style.formGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" value="(408) 996-1010" readOnly />
              </div>
              <div className={Style.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" value="tcook@apple.com" readOnly />
              </div>
            </div>
            <div className={Style.formRow}>
              <div className={Style.formGroup}>
                <label htmlFor="city">City</label>
                <input type="text" value="Agadir" readOnly />
              </div>
              <div className={Style.formGroup}>
                <label htmlFor="country">Country</label>
                <input type="text" value="Morocco" readOnly />
              </div>
            </div>
          </form>
          <button className={Style.editeinfo}>Edit info</button>
        </div>
      )}

      {view === 'password' && (
        <div className={Style.passwordCard}>
          <form className={Style.form}>
            <div className={Style.formGroup}>
              <label htmlFor="oldPassword">Old Password</label>
              <input type="password" id="oldPassword" />
            </div>
            <div className={Style.formGroup}>
              <label htmlFor="newPassword">New Password</label>
              <input type="password" id="newPassword" />
            </div>
            <div className={Style.formGroup}>
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input type="password" id="confirmPassword" />
            </div>
            <button className={Style.saveButton}>Save</button>
          </form>
        </div>
      )}

      </div>

      
    </div>
  );
};

export default Profile;
