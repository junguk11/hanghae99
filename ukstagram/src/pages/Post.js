import React from "react";
import ".././App.css";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { createUkstagramFB } from ".././redux/modules/ukstagram";
import { auth, db, storage } from "../shared/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { getCookie } from "../cookie";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const comment_ref = React.useRef(null);
  const img_ref = React.useRef(null);
  const file_link_ref = React.useRef(null);

  // const uploadFB = async () => {};

  const addPostFB = async () => {
    // 이미지 업로드 하기
    const uploded_file = await uploadBytes(
      ref(storage, `images/${img_ref.current.files[0].name}`),
      img_ref.current.files[0]
    );
    console.log(img_ref);
    // 업로드한 이미지 가져오기
    const file_url = await getDownloadURL(uploded_file.ref);

    console.log(file_url);
    file_link_ref.current = { url: file_url };

    dispatch(
      createUkstagramFB({
        user_id: getCookie("user_email"),
        name: getCookie("user_name"),
        comment: comment_ref.current?.value,
        img_url: file_link_ref.current.url,
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
      })
    );
    navigate("/");
  };

  return (
    <Container>
      <div>
        <input type="file" ref={img_ref} />
      </div>
      <div>
        <input className="comment" ref={comment_ref}></input>
        <Button variant="outlined" onClick={addPostFB}>
          게시글 작성하기
        </Button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 80vw;
  margin: 10px auto;

  div .comment {
    width: 300px;
    height: 30px;
    margin: 20px 20px;
  }
`;

export default Post;
