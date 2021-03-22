import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';

/* Conectaremos firebase con el proyecto */

firebase.initializeApp( firebaseConfig );

export const auth = firebase.auth();
export const firestore = firebase.firestore();

/* Inicio Sesión Google */
const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);

/* Guardar datos de usuario */
export const handleUserProfile = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const {uid} = userAuth; /* User ID */

    const userRef = firestore.doc(`users/${uid}`); /* Ruta al documento */
    const snapshot = await userRef.get();

    if(!snapshot.exists) {
        const { displayName, email} = userAuth;
        const timestamp = new Date();

        try{
            await userRef.set({ /* Datos guardados */
                displayName,
                email,
                createdDate: timestamp,
                ...additionalData
            });
        } catch(err) {
            //console.log(err);
        }
    }
    return userRef;
}