"use client"

import React, { createContext, useEffect, useState, useContext } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getFirestore, collection, addDoc, CollectionReference, type DocumentData, DocumentReference } from 'firebase/firestore';

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  auth: ReturnType<typeof getAuth>;
  db: ReturnType<typeof getFirestore>;
  firebaseReady: boolean;
  getCollection: (firstSegment: string, ...otherSegments: string[]) => CollectionReference<DocumentData>;
  addDocument: (colRef: CollectionReference<DocumentData>, data: any) => Promise<DocumentReference<DocumentData>>;
}
const firebaseConfig = {
  apiKey: "AIzaSyB2uJs32bmnoOgHcB6GTZuu0eBanfZWLWE",
  authDomain: "nutriquest-6c40d.firebaseapp.com",
  projectId: "nutriquest-6c40d",
  storageBucket: "nutriquest-6c40d.firebasestorage.app",
  messagingSenderId: "893360379713",
  appId: "1:893360379713:web:4f7952bf9094caf139b3c0",
  measurementId: "G-C9V61B19G7"
};

const firebaseReady = !!firebaseConfig;
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app)
const db = getFirestore(app);

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  auth: auth,
  db: db,
  firebaseReady: firebaseReady,
  getCollection: (firstSegment: string, ...otherSegments: string[]) => collection(db, firstSegment, ...otherSegments),
  addDocument: async (colRef: CollectionReference<DocumentData>, data: any) => {
    return addDoc(colRef, data);
  },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);
  const isLoggedIn = !!user;

  // Wrapper function to get a collection reference by name
  function getCollection(firstSegment: string, ...otherSegments: string[]) {
    return collection(db, firstSegment, ...otherSegments);
  }


  // Wrapper function to add a doc to a collection by name
  async function addDocument(colRef: CollectionReference, data: any) {
    return addDoc(colRef, data);
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn, user, auth, db, firebaseReady, getCollection,
      addDocument,
    }
    }>
      {children}
    </AuthContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useFirebase must be used within an AuthProvider");
  }
  return context; // returns { auth, firebaseReady, ... }
}

