import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [kakaoData, setKakaoData] = useState();
  const kakaoAuthUrl = 'https://kauth.kakao.com/oauth/authorize?client_id=' + '4dc5f824a01db4a79fddfde6958b2cc4' + '&redirect_uri=' + 'http://127.0.0.1:8080/login/kakao-login&response_type=code';
  const kakaoLogoutUrl = "https://kauth.kakao.com/oauth/logout?client_id=4dc5f824a01db4a79fddfde6958b2cc4&logout_redirect_uri=http://127.0.0.1:8080/login/kakao-login-session";

  const fetchData = async () => {
    try {
        const url = "http://localhost:8080/login/kakao-logout";
        const response = await axios.get(url);
        console.log(response)
    } catch (error) {
        console.log(error);
    }
};

  return (
    <div className="App">
      <a href={kakaoAuthUrl}><img src='C:\kakao_login\kakao_login_test\public\kakao_login_medium_narrow.png'></img></a>
      <br></br>
      <a href={kakaoLogoutUrl}>로그아웃</a>
    </div>
  );
}

export default App;
