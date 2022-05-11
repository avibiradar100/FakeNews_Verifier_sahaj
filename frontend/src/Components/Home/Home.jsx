import React from "react";
import "./Home.css";
import { Typography } from "@mui/material";

const Home = () => {
  return (
    <div className="home">
      <div className="homeleft">
        <Typography variant="h6">No posts yet</Typography>
      </div>
      <div className="homeright">
        <Typography>No users yet</Typography>
      </div>
    </div>
  );
};

export default Home;
