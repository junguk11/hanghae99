import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Edit from "./Edit";
import Create from "./Create";
import Card from "../componets/Card";
const Main = () => {
  const navigate = useNavigate();
  const goToCreate = () => {
    navigate("/create");
  };
  return (
    <MainContainer className="Main">
      <Container>
        <Card />

        <CreateBtn>
          <button onClick={goToCreate}>단어 추가</button>
        </CreateBtn>
      </Container>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  margin: 0 auto;
`;

const Container = styled.div`
  width: 80vw;

  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
`;

const CreateBtn = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;

  button {
    height: 80px;
    width: 80px;
    border-radius: 40px;
    border-color: darkred;
    background-color: darkred;
    color: white;
    cursor: pointer;
  }
`;
export default Main;
