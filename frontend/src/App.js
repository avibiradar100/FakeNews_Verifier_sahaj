import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Account from "./Components/Account/Account";
import Register from "./Components/Register/Register";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/account"
          element={ <Account /> }
        />

        <Route
          path="/register"
          element={ <Register />}
        />

       
      </Routes>
    </Router>
  );
}

export default App;
