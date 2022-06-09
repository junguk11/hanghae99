import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUkstagramFB } from ".././redux/modules/ukstagram";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const PostCard = () => {
  const dic_list = useSelector((state) => state.ukstagram.list);
  // console.log(dic_list);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadUkstagramFB());
  }, [dispatch]);

  return (
    <>
      <Container>
        {dic_list.map((dic, idx) => {
          return (
            <Link to={dic.id} style={{ textDecoration: "none" }}>
              <Card sx={{ Height: 1000, marginTop: 5 }} key={idx}>
                <CardActionArea>
                  <CardMedia component="img" height="140" image={dic.img_url} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      작성자 :　{dic.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      날짜 :　{dic.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      코멘트 :　{dic.comment}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          );
        })}
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 20px auto;
  width: 80%;
  height: 100vw;
`;

export default PostCard;
