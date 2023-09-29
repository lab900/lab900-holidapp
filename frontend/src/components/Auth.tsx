import {auth, googleProvider} from "../config/firebase";
import {onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import {useEffect, useState} from "react";
import {HolidappUser} from "../models/HolidappUser";
import { Button } from '@carbon/react';

async function getUsers(email: string) {
    let baseUrl = `https://us-central1-lab900-holidapp.cloudfunctions.net`;
    if (window.location.hostname === 'localhost') {
        baseUrl = `http://127.0.0.1:5001/lab900-holidapp/us-central1`;
    }
    const response = await fetch(`${baseUrl}/webApi/api/v1/user/${email}`);
    const json = await response.json();
    return json as HolidappUser
}

export const Auth = () => {
    googleProvider.addScope('https://www.googleapis.com/auth/calendar.events');
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    };
    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    const [holidappUser, setHolidappUser] = useState<HolidappUser>()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getUsers(user?.email!)
                    .then((user) => setHolidappUser(user))
                    .catch((err) => console.error(err));
            }
        })
    }, [])

    let template;
    if (auth?.currentUser == undefined) {
        template = (
            <>
                <Button onClick={signInWithGoogle}> Signin with google</Button>
                <Button onClick={logOut}> logOut</Button>
            </>
        )
    } else {
        template = (
            <>
                Welcome {JSON.stringify(holidappUser, null, 2)}
            </>
        )
    }

    return template;
};