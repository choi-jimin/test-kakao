import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, useNavigate, Routes } from "react-router-dom";
import SuccessPage from './SuccessPage';
import './App.css';

function App() {
  const [kakaoData, setKakaoData] = useState();
  const kakaoAuthUrl = 'https://kauth.kakao.com/oauth/authorize?client_id=' + '4dc5f824a01db4a79fddfde6958b2cc4' + '&redirect_uri=' + 'http://127.0.0.1:8080/login/kakao-login&response_type=code';
  const kakaoLogoutUrl = "https://kauth.kakao.com/oauth/logout?client_id=4dc5f824a01db4a79fddfde6958b2cc4&logout_redirect_uri=http://127.0.0.1:8080/login/kakao-login-session";

  const axiosBaseURL = axios.create({
    withCredentials: true,
  }
  );

  const navigate = useNavigate();

  const [idData, setidData] = useState();
  const [pwData, setPwData] = useState();

  const token = async () => {
    try {
        const url = "http://localhost:8080/login/token";
        const response = await axios.get(url);
        console.log(response)
    } catch (error) {
        console.log(error);
    }
};

  const saveUserId = event => {
    setidData(event.target.value);
  };
  const saveUserPw = event => {
    setPwData(event.target.value);
  };

  const LoginEffect = () => {
    (async() => {
      try{
        const url = 'http://localhost:8080/login/true';
        console.log(idData, pwData)
        const response = await axiosBaseURL.post(url, {
          loginEmail : idData,
          loginPw : pwData
        });
        navigate("/login/success"); // 성공적으로 로그인 후 이동
      } catch(error) {
        console.log(error)
      }
    }) ();
  };

  const [searchData, setSearchData] = useState();
  const saveSearchData = event => {
    setSearchData(event.target.value);
  };

  const [searchResult, setSearchResult] = useState();
  const SearchEffect = () => {
    (async() => {
      try{
        const url = 'http://localhost:8080/post/search?searchOne=' + searchData;
        console.log(searchData)
        const response = await axiosBaseURL.get(url);
        console.log(response);
        setSearchResult(response.data.searchResponseList);
      } catch(error) {
        console.log(error)
      }
    }) ();
  };

  const KaKaoPayEffect = () => {
    (async() => {
      try{
        const url = 'http://localhost:8080/purchase/order/pay';
        const response = await axiosBaseURL.post(url, {
            "price": 10000,
            "amount": 2,
            "itemId": 1,
            "usePoint": 100
        });
        console.log(response);
        window.location.href = response.data.next_redirect_pc_url;
      } catch(error) {
        console.log(error)
      }
    }) ();
  };

  return (
    <div className="App">
      <a href={kakaoAuthUrl}><img src='C:\kakao_login\kakao_login_test\public\kakao_login_medium_narrow.png'></img></a>
      <br></br>
      <a href={kakaoLogoutUrl}>로그아웃</a>
      <br></br>
      <a onClick={token}>토큰 갱신하기</a>
      <br></br>
      <br></br>
      <div>자동 로그인 테스트</div>
      아이디 : <input onChange={saveUserId}></input>
      <br></br>
      비밀번호 : <input type='password' onChange={saveUserPw}></input><br></br>
      <button onClick={LoginEffect}>확인</button><br></br>
      <br></br>
      <h2>검색 엔진 테스트</h2>
      검색 : <input onChange={saveSearchData}></input><br></br>
      <button onClick={SearchEffect}>확인</button>
      {searchResult && searchResult.map((searchOne) => (
        <div>{searchOne.postImgName}</div>
      )
      )}
      <button onClick={KaKaoPayEffect}>카카오페이 테스트</button>
    </div>
  );
}

export default App;
