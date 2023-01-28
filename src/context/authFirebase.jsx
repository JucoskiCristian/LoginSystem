
import { useState, createContext, useEffect } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../service/firebaseConfig";
import { Navigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

export const AuthFirebaseContext = createContext({});

export const AuthFirebaseProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const loadStorageData = () => {
            const storageUser = sessionStorage.getItem("@AuthFirebase:user");
            const storageToken = sessionStorage.getItem("@AuthFirebase:token");
            if (storageToken && storageUser) {
                setUser(storageUser);
            }
        };
        loadStorageData();
    });

    function signInFirebase(email, password) {
        const result = signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const user = userCredential.user;
                const token = user.accessToken;
                setUser(user);
                sessionStorage.setItem("@AuthFirebase:token", token);
                sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user))

                return true


            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                return false
            })

        return result
    }

    function signInGoogle() {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;

                setUser(user);
                sessionStorage.setItem("@AuthFirebase:token", token);
                sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user))

            }).catch((error) => {

                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);

            });

    }

    function signOut() {
        sessionStorage.clear();
        setUser(null);
        return <Navigate to="/" />;
    }

    return (
        <AuthFirebaseContext.Provider
            value={{
                signed: !!user,
                user,
                signInFirebase,
                signOut,
                signInGoogle
            }}
        >
            {children}
        </AuthFirebaseContext.Provider>
    );
};