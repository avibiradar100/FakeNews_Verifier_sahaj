import { Avatar, Typography, Button, Link } from "@mui/material";
import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();

    // Three states 0->loading , 1->processing , 2->loaded(readyState)
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
    Reader.readAsDataURL(file);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    //cal  dispatcher
  };



  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography vatiant="h3" style={{ padding: "2vmax" }}>
          Verifier App
        </Typography>

        <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          className="registerInputs"
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="registerInputs"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="registerInputs"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link href="/">
          <Typography>Already Signed Up?Login Now</Typography>
        </Link>

        <Button  type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Register;
