import styled from "styled-components";
import React from "react";
import ".././App.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../shared/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";

import { ChEmail } from ".././elements/ChEmail";

const Register = () => {
  const id_ref = React.useRef(null);
  const name_ref = React.useRef(null);
  const pw_ref = React.useRef(null);
  const pw_ch_ref = React.useRef(null);

  const navigate = useNavigate();

  const registerFB = async () => {
    if (id_ref.current.value === "" || pw_ref.current.value === "") {
      window.alert("아이디 혹은 비밀번호가 공란입니다!");
      return;
    }

    if (!ChEmail(id_ref.current.value)) {
      window.alert("이메일이 형식에 맞지 않습니다!");
      return;
    }

    if (pw_ref.current.value !== pw_ch_ref.current.value) {
      window.alert("비밀번호를 확인 해주세요!");
      return;
    }
    const user = await createUserWithEmailAndPassword(
      auth,
      id_ref.current.value,
      // name_ref.current.value,
      pw_ref.current.value
    );

    console.log(user);

    const user_data = await addDoc(collection(db, "users"), {
      user_id: id_ref.current.value,
      name: name_ref.current.value,
      // password: pw_ref.current.value,
    });
    console.log(user_data.id);
    window.alert("회원가입이 완료되었습니다!");
    navigate("/login");
  };
  return (
    <RegisterSty>
      <h2>회원가입</h2>
      <div>
        <p>아이디</p>
        <input
          className="email"
          ref={id_ref}
          label="이메일"
          placeholder="e-mail"
        />
      </div>
      <div>
        {" "}
        <p>닉네임</p>
        <input className="username" ref={name_ref} placeholder="name" />
      </div>
      <div>
        {" "}
        <p>비밀번호</p>
        <input className="password" ref={pw_ref} placeholder="password" />
      </div>
      <div>
        {" "}
        <p>비밀번호 확인</p>
        <input
          className="passwordch"
          ref={pw_ch_ref}
          placeholder="password-check"
        />
      </div>

      <Button onClick={registerFB}>회원가입하기</Button>
    </RegisterSty>
  );
};

const RegisterSty = styled.div`
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

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

export default Register;
