import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadWordFB, completedWordFB } from ".././redux/modules/Chinese";

const Card = () => {
  const dic_list = useSelector((state) => state.Chinese.list);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadWordFB());
  }, [dispatch]);

  const conpletedWord = async (dic) => {
    await dispatch(completedWordFB(dic));
  };

  return (
    <>
      {dic_list.length === 0 ? (
        <div></div>
      ) : (
        dic_list.map((dic, idx) => {
          return dic.completed === true ? (
            <CompletedCards key={dic.id}>
              <WordP>
                <p>{dic.word}</p>
                <div>
                  <button onClick={() => conpletedWord(dic)}>O</button>
                  <Link to={`/edit/${idx}`}>
                    <button>Edit</button>
                  </Link>
                  <button>X</button>
                </div>
              </WordP>
              <PronunciationP>{[dic.pronunciation]}</PronunciationP>
              <MeanP>{dic.mean}</MeanP>
              <BlueP>{dic.example}</BlueP>
              <BlueP>{dic.interpretation}</BlueP>
            </CompletedCards>
          ) : (
            <Cards key={dic.id}>
              <WordP>
                <p>{dic.word}</p>
                <div>
                  <button onClick={() => conpletedWord(dic)}>O</button>
                  <Link to={`/edit/${idx}`}>
                    <button>Edit</button>
                  </Link>
                  <button>X</button>
                </div>
              </WordP>
              <PronunciationP>{[dic.pronunciation]}</PronunciationP>
              <MeanP>{dic.mean}</MeanP>
              <BlueP>{dic.example}</BlueP>
              <BlueP>{dic.interpretation}</BlueP>
            </Cards>
          );
        })
      )}
    </>
  );
};

const Cards = styled.div`
  width: 24vw;
  height: 180px;
  box-sizing: border-box;
  border: 3px solid darkred;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  display: block;
`;

const CompletedCards = styled.div`
  width: 24vw;
  height: 180px;
  box-sizing: border-box;
  border: 3px solid darkred;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  display: block;
  background-color: lightgrey;
`;
const WordP = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: 25px;
    font-weight: bold;
    margin: 0px;
  }
`;

const PronunciationP = styled.p`
  font-size: 17px;
  margin: 5px 0;
`;

const MeanP = styled.p`
  font-size: 20px;
  margin: 5px 0;
`;

const BlueP = styled.p`
  color: blue;
  font-size: 17px;
  margin: 5px 0;
`;

export default Card;
