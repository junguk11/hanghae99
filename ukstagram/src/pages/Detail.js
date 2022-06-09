import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from ".././shared/firebase";
import { deleteUkstagramFB } from "../redux/modules/ukstagram";
import { getCookie } from "../cookie";

const Detail = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookie_id = getCookie("user_email");
  const data = useSelector((state) => state.ukstagram.list);
  const dataNow = data.filter((value) => value.id === id);
  console.log(dataNow);

  const deletePost = () => {
    dispatch(deleteUkstagramFB({ id }));
    navigate("/");
  };

  return (
    <div>
      {cookie_id === dataNow[0].user_id ? (
        <div>
          <button>수정하기</button>
          <button onClick={deletePost}>삭제하기</button>
        </div>
      ) : (
        <div>현재 페이지는 {id} 페이지입니다</div>
      )}
    </div>
  );
};

export default Detail;
