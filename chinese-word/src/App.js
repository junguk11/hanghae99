import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import Main from "./pages/Main";
import Edit from "./pages/Edit";
import Create from "./pages/Create";
import { db } from "./firebase";

function App() {
  console.log(db);

  return (
    <div className="App">
      <Title className="Title">중국어 단어장</Title>
      <Container>
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </Container>
    </div>
  );
}

const Title = styled.h2`
  width: 100vw;
  margin: 0px;
  padding: 10px;
  border-bottom: 1px solid darkred;
  text-align: center;
`;
const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 20px;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: flex-start;
  box-sizing: border-box;
`;

export default App;
