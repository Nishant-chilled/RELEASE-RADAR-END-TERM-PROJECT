import { createContext, useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    try {
      setUser(currentUser);

      if (currentUser) {
        const profileRef = doc(db, 'users', currentUser.uid);
        const profileSnap = await getDoc(profileRef);
        setProfile(profileSnap.exists() ? profileSnap.data() : null);
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error("Auth session check failed:", error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  });

  return unsubscribe;
}, []);

  const signup = async ({ name, email, password }) => {
    const credentials = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credentials.user, { displayName: name });

    const userPayload = {
      uid: credentials.user.uid,
      name,
      email,
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, 'users', credentials.user.uid), userPayload);
    setProfile(userPayload);
    return credentials.user;
  };

  const login = async ({ email, password }) => {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials.user;
  };

  const logout = () => signOut(auth);

  const value = useMemo(
    () => ({ user, profile, loading, signup, login, logout }),
    [user, profile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
