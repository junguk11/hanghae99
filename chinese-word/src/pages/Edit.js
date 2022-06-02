import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateWordFB } from ".././redux/modules/Chinese";
import React from "react";

const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { word, pronunciation, mean, example, interpretation } = useSelector(
    (state) => state.Chinese.id
  );

  const inputWord = React.useRef(null);
  const inputPronunciation = React.useRef(null);
  const inputMean = React.useRef(null);
  const inputExample = React.useRef(null);
  const inputInterpretation = React.useRef(null);

  const editWord = () => {
    dispatch(
      updateWordFB({
        id: id,
        word: inputWord.current.value,
        pronunciation: inputPronunciation.current.value,
        mean: inputMean.current.value,
        example: inputExample.current.value,
        interpretation: inputInterpretation.current.value,
      })
    );

    window.alert("단어가 수정되었습니다!");
    navigate("/");
  };

  return (
    <UpdateWord>
      <h2>단어 수정하기</h2>
      <span>단어</span>
      <input className="word" ref={inputWord} defaultValue={word}></input>

      <span>병음</span>
      <input
        className="pronunciation"
        ref={inputPronunciation}
        defaultValue={pronunciation}
      ></input>

      <span>의미</span>
      <input className="mean" ref={inputMean} defaultValue={mean}></input>

      <span>예문</span>
      <input
        className="example"
        ref={inputExample}
        defaultValue={example}
      ></input>

      <span>해석</span>
      <input
        className="interpretation"
        ref={inputInterpretation}
        defaultValue={interpretation}
      ></input>

      <button onClick={editWord}>수정하기</button>
    </UpdateWord>
  );
};

const UpdateWord = styled.div`
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
export default Edit;
