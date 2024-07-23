import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../Sign.module.css';
import { useGoogleLogin } from '@react-oauth/google';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useNavigate();



  // sign up with Google
  const handleGoogleSuccess = async (codeResponse) => {
    try {
      console.log("Google Login Code Response:", codeResponse);
      const response = await axios.post("http://localhost:8000/googleAuth", {
        code: codeResponse.code,
      });
  
      setMessage(response.data.message);
      if (response.data.status === 'success') {
        history('/test');;
      }
    } catch (error) {
      console.error("Error occurred:", error.response ? error.response.data : error.message);
      setMessage("Unable to authenticate with Google. Please try again later.");
    }
  };

  const googleLogin = useGoogleLogin({
  onSuccess: handleGoogleSuccess,
  onError: (error) => {
    console.log('Google Login Failed:', error);
    setMessage("Google sign-in failed. Please check your internet connection and try again.");
  },
  flow: 'auth-code',
  clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  });


  //sign in with the form 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/signIn', {
        email,
        password,
      }, {
        withCredentials: true,
      });

      if (response.data.status === "success") {
        history('/test');
      } else {
        history('/');
        setMessage(response.data.message)

      }
    } catch (error) {
      if (error.response && error.response.data.status === 'failure') {
        setMessage(error.response.data.message);
      } else {
        console.error('Error occurred:', error);
        setMessage('Erreur Interne du Serveur!');
      }
    }
  };




  return (
    <form onSubmit={handleSubmit} className={styles['sign-in-form']}>
      <h2 className={styles.title}>Sign in</h2>

      <div className={styles['input-field']}>
        <div className={styles['ccc']}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA0UlEQVR4nO3UwWkCQRSH8R96E5ICBLEFIZAalBDwYgu2YAu2kBZyySFVBARbCKsWEMGbsrIwC0vY1cmqwcN+8GDY9/h/zOwwNNwTL1gjvbBWGJUJVlcIT0MlZYK8eSlpVU7e+ES/RnAX7zGCrHaYoR0R3MIU218ZlYJXfIf1Es8nwgf4CrMbTGIEGR3MsccBb3gszJb1H0pyKgU5T1gUbsY4VBK+LcLMuZyTjVY445/If/RnQU4PH6GydRW1BbE0gvpHdPPHbnQlSYLh+Y02/BdHOA2bqc6k+4oAAAAASUVORK5CYII="/>
        </div>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className={styles['input-field']}>
        <div className={styles['ccc']}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAvklEQVR4nO2UOw7CMBBEXwcF3AAugkJPSMNF+BwTqEJ6GnIDoHdkaUEWwsi7AYlIGWkKK7Mza29s+AMMgS1wAO7CPbABBm3Np0AFuAhLYNKm80qMTkABjIRF8K207mQXmHvTV4yBs2jWloCjFPtuY1iJxs9EjZsUv+s+3IXXXC0Bj0F+S/fEEqg//DkuQl+TpwRYzJ3wkhJgNXepR9UHqI5oBmSKtXoGGTBXrPsh0417UP/6qchFaDFfpAR0Cw1ztfU9EWm6SwAAAABJRU5ErkJggg=="/>
        </div>
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className={styles['error-container']}>
          {message && <p className={styles['message']}>{message}</p>}
      </div>

      <input type="submit" value="Login" className={`${styles.btn} ${styles.solid}`} />

      <div className={styles['divider']}>
        <span className={styles['divider-text']}>Or Sign in with</span>
      </div>
      
      <div className={styles['social-media']}>
        <a onClick={() => googleLogin()} className={styles['social-icon']}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEkUlEQVR4nO2Zb0wbZRzHn3taesUtRpOJYbo/DoQM5c/GMgryzxkYxbGBiQsbNBCEFGaIY8zCCuaUMSiQAQMGQWAgcSY2GeuNuzpc8NqNvRoCItE3841Dthj3ToNzbX+mVRBI197Zo2VJv8n3XZ+nn89dn6dPrwj5448/HgcoJIWqgGIoxywU4HuQTfwJSsIKBxBAKgJIQzbIJhZBhX+BE/g6VAUU2ccgXwc0UgWU4tvwNmGBJASCqiQsoMa3QRsQ433wOlk4qPEsvCkQ2llTEUAxnoEaFOIdeA3RCumEzWPwtT2IrHCK0K0f+HkUCMX4B9HBk9b0PTwNFJKJC9+NngcVfrDu8En/toJoFw9+EMnhOPGr1+DLCE40eIeAGn/vPXgsMvyHRIfgrbEMT0IlroUmaQpQaAtQKAjOSN6C05hy7Db21zgbW4pN4sI3kyGQQVh5g5+W9PJZfEChZ+ADydAqkVKR4R1vVIHv8IIvwPNwDr0oeP4aFAJ5+P76wJvl22CcfAQaCUCyC/gSPAV6JEEbLWAmdWAmwdHeAIB0wvmV35DweiQBs2x+WcDeURmACv8Hn0lYoAK9hDZiwCSPXwW/VI4E0En/ObuclPSjjRowybROBZY6FPAAyhGJNmrATF5xKWCSdQiZL1gzC2I0XDthO9rUd9e9gImccynAkRm+EAjWzMIbddcW+Qg8dCMQ6iuB3TW3rHwEHrkWQJt9JbCjehKeaoHtVd+C5x+hm7IwXwns1t60Pd2L+JNRHovYTI642UY7fSVwRDc8z0NAduZJ8A+5Z6Geif/jvF4RiEROy3D+puiPvrG4Eii/0DjqXoALVDiDnx0PBhWthENXs6HDGHtJbIGTnfX97u6Arq/iuHsBQBjMsntL4DYzCfRYOGQbDjvg7c2jlZaL11/bJhZ8W496Z2SNyeoK/vVas4XiKH5P88BENtrhfzdthrNMwjL4ylaPJi9wXIrHjwcpjpIeafxswd3VL2lrm+A9KXCBL98df+GvEjrdKfxSP2YTZjyRoDhKmt/SM+d2/6+egsbuylhBkzcwihlX8CvvRP/X4VuFwvfeiNhe1lX3E5/d51hz75zQ+RE9FvZKPq208pHIp5WWzq/2DlCDKXJ38w6PRW1qZ/b15RmU1pyRHDja2uH2FEp9ekrQl+dyutmY1iweAitFGljFdJdxL6VnIw5cGdsVdJkL2zJgjEq8aNxTV8ckTNpfs3JM1kgOFPZQsLXqO6cC77c3dSNPomPjpvkKeNKiwXLYWX1nFfy7TQM/Ik+j10fINHTqfW9IFH5RCJG1Jgd8ev2Xv53o6hJ0cHxiOG7HczVM4oI3JI7pc0HVemGeGq4MEgV+hYT8LBM/K2RN/J+eYxXTRmPo+v3m7jNGNecaMq2iX3lDprWXjWlG3sgwvSe0gY2beseQ5TF4ztXDjqt++caru5C3MzQWGdvM7L9VZDj4WCh4AZ3xuJGJm/icifb+n3xrowck6WeiC1uN+0a1TOLPajptUWVQWu13yH4IzDVk2tSGtMWqa8nzLex+ts8YU2Afg/zxxx/kaf4GzSVnCicBYF0AAAAASUVORK5CYII="/>
          Sign in with Google
        </a>
      </div>
    </form>
  );
};

export default SignInForm;