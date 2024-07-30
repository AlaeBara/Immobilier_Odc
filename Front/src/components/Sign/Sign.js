import React, { useState } from 'react';
import styles from './Sign.module.css'; 
import SignInForm from './Sign_in_up_component/Sign_in';
import SignUpForm from './Sign_in_up_component/Sign_up';
import svg1 from './signIn.svg'
import svg2 from './sign-up.svg'


const AuthContainer = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  return (
    <div className={`${styles.container} ${isSignUpMode ? styles['sign-up-mode'] : ''}`}>
      <div className={styles['forms-container']}>
        <div className={styles['signin-signup']}>
          <SignInForm />
          <SignUpForm onSignUpSuccess={handleSignInClick} />
        </div>
      </div>
      <div className={styles['panels-container']}>
        <div className={`${styles.panel} ${styles['left-panel']}`}>
          <div className={styles.content}>
            <h3>New to our real estate platform?</h3>
            <p>
              Discover your dream property with our extensive listings. Join us today and start your journey to finding the perfect home!
            </p>
            <button className={`${styles.btn} ${styles.transparent}`} onClick={handleSignUpClick}>
              Sign up
            </button>
          </div>
          <img src={svg1} className={styles.image} alt="Real Estate" />
        </div>
        <div className={`${styles.panel} ${styles['right-panel']}`}>
          <div className={styles.content}>
            <h3>Already a member?</h3>
            <p>
              Welcome back! Sign in to continue exploring our property listings and enjoy personalized recommendations based on your preferences.
            </p>
            <button className={`${styles.btn} ${styles.transparent}`} onClick={handleSignInClick}>
              Sign in
            </button>
          </div>
          <img src={svg2}  className={styles.image} alt="Real Estate" />
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;