import React from "react";
import { useDispatch } from "react-redux";
import PostCard from "../component/PostCard";
import { loadUkstagramFB } from "../redux/modules/ukstagram";

const Main = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadUkstagramFB());
  }, [dispatch]);
  return (
    <div>
      <PostCard></PostCard>
    </div>
  );
};
export default Main;
