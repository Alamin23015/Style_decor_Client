// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup, 
  updateProfile 
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// এই ফাংশনটা দিয়ে ইউজারকে ডাটাবেসে সেভ করব
const saveUserToDB = async (user) => {
  const userInfo = {
    name: user.displayName || "User",
    email: user.email,
    photoURL: user.photoURL || "https://i.ibb.co/0s3pdnc/avatar.png",
    role: user.email === "alamin16105@gmail.com" ? "admin" : "user"  // তোর ইচ্ছামতো চেঞ্জ কর
  };

  try {
    await axios.post(`${import.meta.env.VITE_SERVER_URL || "http://localhost:5000"}/users`, userInfo);
  } catch (error) {
    console.error("Failed to save user to DB:", error);
  }
};

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        saveUserToDB(result.user);
        return result;
      });
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        saveUserToDB(result.user); 
        return result;
      });
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        saveUserToDB(result.user); 
        return result;
      });
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    }).then(() => {
      saveUserToDB(auth.currentUser); 
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);

      if (currentUser) {
        
        axios.post(`${import.meta.env.VITE_SERVER_URL || "http://localhost:5000"}/jwt`, { 
          email: currentUser.email 
        })
        .then(res => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        })
        .catch(err => console.error("JWT Error:", err));
      } else {
        localStorage.removeItem("access-token");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    createUser,
    signIn,
    googleLogin,
    logOut,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;