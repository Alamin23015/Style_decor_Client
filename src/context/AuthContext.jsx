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
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const baseUrl = import.meta.env.VITE_SERVER_URL || "https://style-decor-server-production.up.railway.app";

  
  const saveUserToDB = async (user) => {
    if (!user?.email) return;

    const userInfo = {
      name: user.displayName || "User",
      email: user.email,
      photoURL: user.photoURL || "https://github.com/Alamin23015/Source_image/raw/main/dec.jpg",
      role: user.email === "alamin16105@gmail.com" ? "admin" : "user" 
    };

    try {
      await axios.post(`${baseUrl}/users`, userInfo);
    } catch (error) {
      console.error("Failed to save user to DB:", error);
    }
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("access-token"); 
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
      
        await saveUserToDB(currentUser);

        
        try {
          const res = await axios.post(`${baseUrl}/jwt`, { email: currentUser.email });
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        } catch (err) {
          console.error("JWT Server Error (500):", err.response?.data || err.message);
          
        }
      } else {
        localStorage.removeItem("access-token");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [baseUrl]);

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