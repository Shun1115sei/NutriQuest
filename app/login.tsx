"use client"

import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";

export default function Login() {

  const googleSignInBtnRef = useRef<HTMLButtonElement | null>(null);
  const authSubmitBtnRef = useRef<HTMLButtonElement | null>(null);
  const [authError, setAuthError] = useState("")

  const firebaseConfig = {
    apiKey: "AIzaSyB2uJs32bmnoOgHcB6GTZuu0eBanfZWLWE",
    authDomain: "nutriquest-6c40d.firebaseapp.com",
    projectId: "nutriquest-6c40d",
    storageBucket: "nutriquest-6c40d.firebasestorage.app",
    messagingSenderId: "893360379713",
    appId: "1:893360379713:web:4f7952bf9094caf139b3c0",
    measurementId: "G-C9V61B19G7"
  };

  let firebaseReady = !!firebaseConfig
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
  const auth = getAuth(app)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        window.location.href = "/dashboard/";
      }
    });
    return () => unsubscribe();
  }, []);


  async function authTry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const form = event.target as HTMLFormElement;
      const emailInput = form.elements.namedItem("email") as HTMLInputElement | null;
      let email = ""
      let password = ""
      if (emailInput) {
        email = emailInput.value;
      }
      const passwordInput = form.elements.namedItem("password") as HTMLInputElement | null;
      if (passwordInput) {
        password = passwordInput.value;
      }
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/dashboard/";
    } catch (error) {
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError('An unknown error occurred. Authentication failed.');
      }
    }
  }

  useEffect(() => {
    // Access the button element here
    const googleSignInBtn = googleSignInBtnRef.current;
    const authSubmitBtn = authSubmitBtnRef.current;

    // You can now manipulate or add event listeners as needed
    if (!firebaseReady) {
      if (googleSignInBtn) {
        googleSignInBtn.disabled = true;
        googleSignInBtn.classList.add('btn-disabled', 'opacity-60', 'cursor-not-allowed');
      }
      if (authSubmitBtn) authSubmitBtn.disabled = true;
    }
  }, []);

  async function signInWithGoogle() {
    if (!firebaseReady) {
      setAuthError('Authentication is currently unavailable.');
      return;
    }
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      window.location.href = "/dashboard/";

    } catch (error) {
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError('An unknown error occurred. Authentication is currently unavailable.');
      }
    }
  }

  return (
    <>
      <div id="auth-container" className="min-h-screen flex items-center justify-center p-4 bg-base-200">
        <div className="bg-base-100 p-8 rounded-2xl shadow-lg w-full max-w-sm">
          <div className="flex justify-end mb-4">
            <div className="join">
              <input type="radio" name="login-language" value="en" className="lang-radio join-item btn btn-sm"
                aria-label="EN" defaultChecked />
              <input type="radio" name="login-language" value="zh" className="lang-radio join-item btn btn-sm"
                aria-label="中" />
            </div>
          </div>
          <h1 id="auth-title" data-lang-key="loginTitle" className="text-3xl font-bold text-center mb-6">
            Login
          </h1>
          <p id="auth-error" className="text-error text-center mb-4">{authError}</p>

          <form onSubmit={authTry} id="auth-form">
            <fieldset className="fieldset">
              <legend className="fieldset-legend" data-lang-key="emailLabel">Email</legend>
              <label className="input validator">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none"
                    stroke="currentColor">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input id="email" type="email" name="email" placeholder="mail@site.com" required />
              </label>
              <div className="validator-hint hidden">Enter valid email address</div>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend" data-lang-key="passwordLabel">Password</legend>
              <label className="input validator">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none"
                    stroke="currentColor">
                    <path
                      d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z">
                    </path>
                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                  </g>
                </svg>
                <input id="password" type="password" name="password" required placeholder="Password" minLength={8}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
              </label>
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />
                At least one number
                <br />
                At least one lowercase letter
                <br />
                At least one uppercase letter
              </p>
            </fieldset>

            <div className="text-right mb-6">
              <a
                id="forgot-password-link"
                className="text-sm link link-hover link-primary"
                href="#"
                data-lang-key="forgotPassword"
                onClick={(e) => {
                  e.preventDefault();
                  const email = prompt("Please enter your email for password reset:");
                  if (email) {
                    sendPasswordResetEmail(auth, email).then(() => {
                      alert("Password reset email sent.");
                    }).catch((error) => {
                      setAuthError(error.message);
                    });
                  }
                }}
              >
                Forgot Password?
              </a>

            </div>
            <button ref={authSubmitBtnRef} id="auth-submit-btn" className="w-full btn btn-primary" type="submit"
              data-lang-key="loginButton">Login</button>
          </form>
          <p className="text-center text-sm mt-4">
            <span data-lang-key="authTogglePrompt">Don't have an account yet? </span>
            <Link id="auth-toggle-link" className="link link-hover link-primary" to="/signup" data-lang-key="authToggleAction">Sign
              Up</Link>
          </p>

          <div className="divider">OR</div>

          <button ref={googleSignInBtnRef} id="google-signin-btn" className="w-full flex items-center justify-center btn btn-outline mt-4">
            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"></path>
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"></path>
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"></path>
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"></path>
            </svg>
            <span data-lang-key="googleSignIn" onClick={signInWithGoogle}>Log in with Google</span>
          </button>
          <button id="guest-mode-btn" onClick={() => { document.cookie = "userMode=guest;path=/"; window.location.href = "/dashboard/" }} className="w-full mt-4 btn btn-soft" data-lang-key="guestButton">
            Continue as Guest
          </button>
        </div>
      </div>
    </>
  )
}
