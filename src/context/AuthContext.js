import { createContext, useContext, useState, useEffect } from "react";
import "../firebase/firebase";
import { getAuth, createUserWithEmailAndPassword, updateProfile,
  signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

// useAuth for default get auth
export function useAuth(){
  return useContext(AuthContext);
}

// main function
export function AuthProvider({ children }) {

  // states
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();


  // state changed trigger
  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsub;
  }, []);


  // signup function
  async function signup(email, password, username) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);

    // update profile
    await updateProfile(auth.currentUser, { displayName: username });

    // update local current user
    const user = auth.currentUser;
    setCurrentUser({...user,});
  }


  // login function
  function login(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword( auth, email, password );
  }


  // logout function
  function logout() {
    const auth = getAuth();
    return signOut(auth);
  }
  

  // value define
  const value = { currentUser, signup, login, logout };

  return (
    <AuthContext.Provider value={ value }>
      { !loading && children }
    </AuthContext.Provider>
  )
}