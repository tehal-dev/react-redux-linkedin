import React, { useState } from "react";
import "./Login.css";
import "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { login } from "./features/userSlice";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [fullName, setfullName] = useState("");
  const dispatch = useDispatch();

  const loginToApp = async (e) => {
    e.preventDefault();

    console.log("password", password, email);
    try {
      let userAuth = await signInWithEmailAndPassword(auth, email, password);

      if (!userAuth) {
        throw new Error("user not found");
      }

      dispatch(
        login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName: userAuth.user.displayName,
          photoURL: userAuth.user.photoURL,
        })
      );
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  const register = async () => {
    if (!fullName) {
      return alert("Please enter a full name");
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(user, {
        displayName: fullName,
        photoURL: profilePicUrl,
      });

      dispatch(
        login({
          email: user.email,
          uid: user.uid,
          displayName: fullName,
          photoURL: profilePicUrl,
        })
      );
    } catch (error) {
      alert("invalid Credentails");
    }
  };
  return (
    <div className="login">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1024px-LinkedIn_Logo.svg.png" />
      <form>
        <input
          value={fullName}
          onChange={(e) => setfullName(e.target.value)}
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />

        <input
          value={profilePicUrl}
          onChange={(e) => setProfilePicUrl(e.target.value)}
          type="text"
          placeholder="Profile Picture url"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <button type="submit" onClick={loginToApp}>
          {" "}
          Sign In{" "}
        </button>
      </form>
      <p>
        Not a member?{" "}
        <span className="login__register" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login;
