import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useRef, useState } from "react";
import auth from "../Firebase/firebase.config";
import { API_BASE } from "../api";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Creating The Function Of The USER
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login Function
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google SignIn
  const googleSignIn = () => {
    // setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //   Github Signin
  const gitHubSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, gitHubProvider);
  };

  // Logout Function
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const isInitialAuthEvent = useRef(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      const previouslyAnonymous = isInitialAuthEvent.current && !currentUser;
      isInitialAuthEvent.current = false;

      setUser(currentUser);
      setLoading(false);

      if (previouslyAnonymous) return;

      const endpoint = currentUser ? "/jwt" : "/logout";
      axios
        .post(
          `${API_BASE}${endpoint}`,
          { email: currentUser?.email },
          { withCredentials: true }
        )
        .catch((err) => {
          if (import.meta.env.DEV) {
            console.warn(`Auth ${endpoint} failed:`, err.message);
          }
        });
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    createUser,
    logIn,
    logOut,
    loading,
    googleSignIn,
    gitHubSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default ContextProvider;
ContextProvider.propTypes = {
  children: PropTypes.node,
};
