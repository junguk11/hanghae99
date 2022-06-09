import React from "react";
import ".././App.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../shared/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDocs, where, query, collection } from "firebase/firestore";
import { Button } from "@material-ui/core";
import { ChEmail } from ".././elements/ChEmail";
import { setCookie } from "../cookie";

const Login = () => {
  // 로그인 하기
  const id_ref = React.useRef();
  const pw_ref = React.useRef();
  const navigate = useNavigate();

  const loginFB = async () => {
    if (id_ref.current.value === "" || pw_ref.current.value === "") {
      window.alert("아이디 혹은 비밀번호가 공란입니다!");
      return;
    }

    if (!ChEmail(id_ref.current.value)) {
      window.alert("이메일이 형식에 맞지 않습니다!");
      return;
    }
    const user = await signInWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );

    console.log(user);

    const user_docs = await getDocs(
      query(collection(db, "users"), where("user_id", "==", user.user.email))
    );

    user_docs.forEach((u) => {
      console.log(u.data());
      setCookie("user_email", u.data().user_id);
      setCookie("user_name", u.data().name);
    });

    navigate("/");
  };

  return (
    <RegisterSty>
      <h2>로그인</h2>
      <div>
        <p>아이디</p>{" "}
        <input ref={id_ref} className="login_email" placeholder="e-mail" />
      </div>
      <div>
        {" "}
        <p>비밀먼호</p>{" "}
        <input ref={pw_ref} className="login_password" placeholder="password" />
      </div>

      <Button onClick={loginFB}>로그인하기</Button>
    </RegisterSty>
  );
};

const RegisterSty = styled.div`
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: left;
  font-family: "Do Hyeon", sans-serif;

  div {
    margin: 0px auto;
  }
  h2 {
    text-align: left;
  }
  p {
    text-align: left;
  }

  input {
    width: 40vw;
    margin-bottom: 20px;
  }
  Button {
    font-family: "Do Hyeon", sans-serif;
  }
`;

export default Login;
