import React from "react";
import ".././App.css";
import styled from "styled-components";
import { Button, ButtonGroup, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../shared/firebase";
import { removeCookie } from "../cookie";

const Header = () => {
  const [is_login, setIsLogin] = React.useState(false);

  //로그인 체크
  const loginCheck = async (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck);
  }, []);
  return (
    <header>
      <Containers>
        <MainBtn>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Button>메인페이지</Button>
          </Link>
        </MainBtn>

        {is_login ? (
          <LogBtn>
            <ButtonGroup variant="text" aria-label="text button group">
              <Link to={"/notify"} style={{ textDecoration: "none" }}>
                <Button>알림</Button>
              </Link>

              <Link to={"/"} style={{ textDecoration: "none" }}>
                <Button
                  onClick={() => {
                    signOut(auth);
                    removeCookie("user_email");
                    removeCookie("user_name");
                  }}
                >
                  로그아웃
                </Button>
              </Link>
            </ButtonGroup>
            <PostBtn>
              <Link to={"/post"} style={{ textDecoration: "none" }}>
                <Button>작성하기</Button>
              </Link>
            </PostBtn>
          </LogBtn>
        ) : (
          <LogBtn>
            <ButtonGroup variant="text" aria-label="text button group">
              <Link to={"/register"} style={{ textDecoration: "none" }}>
                <Button>회원가입</Button>
              </Link>{" "}
              <Link to={"/login"} style={{ textDecoration: "none" }}>
                <Button>로그인하기</Button>
              </Link>
            </ButtonGroup>
          </LogBtn>
        )}
      </Containers>
    </header>
  );
};
const Containers = styled.div`
  width: 85vw;
  height: 10vw;
  margin: 0px auto;

  Button {
    font-family: "Do Hyeon", sans-serif;
    font-size: 20px;
  }
`;
const MainBtn = styled.div`
  float: left;
`;

const LogBtn = styled.div`
  float: right;
`;

const PostBtn = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;
export default Header;
