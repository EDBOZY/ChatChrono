
import { initializeApp } from "firebase/app";
import {getAuth}from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "add your api key here",
    authDomain: "wechat-279fc.firebaseapp.com",
    projectId: "wechat-279fc",
    storageBucket: "wechat-279fc.appspot.com",
    messagingSenderId: "307824390296",
    appId: "1:307824390296:web:d477a4c877c8fb64d360ed"
};


export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage = getStorage();
export const db= getFirestore();
