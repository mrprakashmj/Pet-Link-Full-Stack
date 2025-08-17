
"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { createUserProfile, getUserProfile } from '@/lib/firestore';
import type { AppUser } from '@/lib/types';

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signup: (email: string, pass: string, firstName: string, lastName: string) => Promise<void>;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // First, set a basic user object from the auth state
        const basicUser: AppUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || '',
            firstName: firebaseUser.displayName?.split(' ')[0] || '',
            lastName: firebaseUser.displayName?.split(' ').slice(1).join(' ') || '',
        };
        setUser(basicUser);

        // Then, try to get the full profile from Firestore
        try {
            const userProfile = await getUserProfile(firebaseUser.uid);
            if (userProfile) {
                setUser(userProfile);
            }
        } catch (error) {
            console.error("Failed to fetch user profile, staying with basic info:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const signup = async (email: string, pass: string, firstName: string, lastName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const firebaseUser = userCredential.user;
    
    if (firebaseUser) {
        const displayName = `${firstName} ${lastName}`.trim();
        await updateProfile(firebaseUser, { displayName });
        
        const newUserProfile: AppUser = {
            uid: firebaseUser.uid,
            email,
            displayName,
            firstName,
            lastName,
            photoURL: firebaseUser.photoURL || '',
        };
        
        await createUserProfile(firebaseUser.uid, newUserProfile);
        // The onAuthStateChanged listener will automatically pick up the new user state
        // and set the user, so we don't need to call setUser here. This prevents race conditions.
    }
  };

  const login = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
    // The onAuthStateChanged listener will handle setting the user state.
  };

  const logout = () => {
    return firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
