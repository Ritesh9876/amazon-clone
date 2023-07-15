import React, { useState } from 'react';
import './login.css'
import { Link, useNavigate } from "react-router-dom";
import { auth } from '../../Firebase/firebase';
import { db } from '../../Firebase/firebase';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
function Login() {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();
        signInWithEmailAndPassword(auth,email, password)
            .then(currAuth => {
                history('/')
            })
            .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();
        
        createUserWithEmailAndPassword(auth,email, password)
            .then((currAuth) => {
                console.log("currAuth is this ",auth)
                db.collection("users")
                .add({
                    email:email,
                })
                .then((docRef) => {
                    console.log("New order added with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding order: ", error);
                });
                // it successfully created a new user with email and password
                if (auth) {
                    history('/')
                }
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className='login_main_container'>
            <Link to='/'>
                <img
                alt="login_image"
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={register} className='login__registerButton'>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login