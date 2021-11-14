import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from "axios";
import { Typography, Button } from "@mui/material";

import Summary from './pages/Summary';

function App() {
  const createCookieInHour = (cookieName, cookieValue, hourToExpire) => {
    let date = new Date();
    date.setTime(date.getTime()+(hourToExpire*60*60*1000));
    document.cookie = cookieName + " = " + cookieValue + "; expires = " +date.toGMTString();
  }

  const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  const checkCookie = () => {
    let token = getCookie("token");
    if (token !== "") {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }

  const [loginInfo, setLoginInfo] = useState({
    user: "",
    password: ""
  })

  const [auth, setAuth] = useState(false)

  useEffect(() => {
    checkCookie()
  }, [auth])

  const handleUser = (e) => {
    setLoginInfo({ ...loginInfo, user: e.target.value})
  }
  const handlePassword = (e) => {
    setLoginInfo({ ...loginInfo, password: e.target.value})
  }

  const sendLogin = (e) => {
    e.preventDefault();
    Axios.post("http://magfooddiary-env.eba-bh6g2nuu.us-east-2.elasticbeanstalk.com/login", { user: loginInfo.user, password: loginInfo.password })
    .then(response => {
      createCookieInHour('token', response.data, 1)
      checkCookie()
      window.sessionStorage.setItem("user", loginInfo.user);
    })
    .catch(err => console.log(err))
  }

  const logout = (e) => {
    e.preventDefault();
    document.cookie = 'token' + '=; Max-Age=0'
    setAuth(false);
  
  }

  if (!auth)
  return (
    <div className="App">
      <h1>Food Diary</h1>
      <Typography>Login</Typography>
      <p>Username</p>
      <input onChange={handleUser} />
      <p>Password</p>
      <input onChange={handlePassword}/>
      <Button onClick={sendLogin}>Login</Button>
    </div>
  );
  return (
    <div className="App">
      <Button onClick={logout}>Logout</Button>
      <Summary />
    </div>
  );
}

export default App;
