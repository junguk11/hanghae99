import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createWordFB } from ".././redux/modules/Chinese";
import React, { useRef } from "react";

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputWord = React.useRef(null);
  const inputPronunciation = React.useRef(null);
  const inputMean = React.useRef(null);
  const inputExample = React.useRef(null);
  const inputInterpretation = React.useRef(null);
  // const dataId = useRef(0);

  const addWordList = () => {
    dispatch(
      createWordFB({
        word: inputWord.current.value,
        pronunciation: inputPronunciation.current.value,
        mean: inputMean.current.value,
        example: inputExample.current.value,
        interpretation: inputInterpretation.current.value,
        completed: false,
      })
    );

    window.alert("단어가 추가되었습니다!");
    navigate("/");
  };

  return (
    <CreateWord>
      <h2>단어 추가하기</h2>
      <span>단어</span>
      <input className="word" ref={inputWord}></input>

      <span>병음</span>
      <input className="pronunciation" ref={inputPronunciation}></input>

      <span>의미</span>
      <input className="mean" ref={inputMean}></input>

      <span>예문</span>
      <input className="example" ref={inputExample}></input>

      <span>해석</span>
      <input className="interpretation" ref={inputInterpretation}></input>

      <button onClick={addWordList}>저장하기</button>
    </CreateWord>
  );
};

const CreateWord = styled.div`
  margin: 20px auto;
  width: 700px;
  text-align: left;

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  span {
    display: block;
    font-size: 20px;
    font-weight: bold;
    margin: 10px auto;
  }

  input {
    border: none;
    border-bottom: 2px solid darkred;
    margin-bottom: 30px;
    width: 100%;
  }
  input:focus {
    outline: none;
    border-bottom: 4px solid darkred;
  }
  button {
    display: block;
    margin: 20px auto;
    width: 200px;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    border-radius: 10px;
    border-color: darkred;
    background-color: transparent;
    cursor: pointer;
  }
`;

export default Create;
