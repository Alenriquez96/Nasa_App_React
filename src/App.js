import "./styles/styles.scss"
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { BrowserRouter } from 'react-router-dom';
import {themeContext} from './context/themeContext';
import { userContext } from "./context/userContext";
import React, {useState} from "react";
import Cookies from 'universal-cookie';


function App() {
  const [theme, setTheme] = useState("");
  const [user, setuser] = useState("");
  const cookies = new Cookies();

  const toggleTheme = () => theme===""?setTheme("-dark"):setTheme("");

  const login = (name) =>{
    setuser(name)
  }

  const logout = () =>{
    setuser("");
    cookies.remove("access-token");
  }

  const themeData = {
    theme,
    toggleTheme
  }

  const userData = {
    user,
    login,
    logout
  }

  return (
    <div className="App">
      <themeContext.Provider value={themeData}>
        <BrowserRouter>
          <userContext.Provider value={userData}>
            <Header />
            {/* Recordar siempre llamar value para pasar por context */}
              <Main />
          </userContext.Provider>
        </BrowserRouter>
        <Footer />
      </themeContext.Provider>
    </div>
  )
}

export default App;
