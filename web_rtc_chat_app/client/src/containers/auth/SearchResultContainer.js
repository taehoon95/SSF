// 2021-11-25
// 윤성준
// 검색기능 페이지 추가

// 2021-11-29 강동하 로딩 추가

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "../../pages/Pagination";
import styled from 'styled-components';

import {
  Box,
  CircularProgress,
  Grid,
  
  Typography,
} from "../../../node_modules/@material-ui/core/index";
import { HelpOutline } from "../../../node_modules/@material-ui/icons/index";
import axios from "../../../node_modules/axios/index";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
const PageUl = styled.ul`
  float:left;
  list-style: none;
  text-align:center;
  border-radius:3px;
  color:white;
  padding:1px;
  border-top:2px solid;
  border-bottom:2px solid;
  background-color: rgba( 0, 0, 0, 0.4 );
`;

 const PageLi = styled.li`
  display:inline-block;
  font-size:17px;
  font-weight:600;
  padding:5px 10px 0.5px 12px;
  border-radius:5px;
  width:25px;
  &:hover{
    cursor:pointer;
    color:white;
    background-color:#263A6C;
  }
  &:focus::after{
    color:white;
    background-color:#263A6C;
  }
`;

 const PageSpan = styled.span`
  &:hover::after,
  &:focus::after{
    border-radius:100%;
    color:white;
    background-color:#263A6C;
  }
`;

const SearchResultContainer = () => {
  const [selectList, setSelectList] = useState([]);
  const { v_name } = useParams();
  const [load, setLoad] = useState(0);

  // 2021-12-01 윤성준 pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3); // 한 페이지당 보여줄 게시물 수

  const indexOfLast = currentPage * postsPerPage; // 비디오 뽑아오기
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  useEffect(() => {
    setLoad(0);
    myVideoList();
    console.log(v_name);
  }, [v_name]);

  // 검색 결과 가져오기
  const myVideoList = () => {
    axios
      .get(`/api/videoSearch/${v_name}`)
      .then((response) => {
        setSelectList(response.data);
        console.log(load);
        setLoad(1);
      })
      .catch((error) => {
        alert("record 가져오기 실패");
        console.log(error);
      });
  };

  const nextbutton = () =>{
    if(currentPage < Math.ceil(selectList.length / 3)){
      setCurrentPage(currentPage +1 );
    }
  }
  const backbutton = () =>{
    if(currentPage > 1){
      setCurrentPage(currentPage -1 );
    }    
  }
  return (
    <>
    <Grid
      container
      style={{  marginTop: 80, background: "#303030", postion: "relative" }}
    
    >
        {/* 2021-11-25 강동하 결과 없음 안뜨는 거 수정 */}
        {/* 2021-11-29 강동하 로딩 추가 */}
        {load === 0 ? (
          // 검색 로딩중일 때
          <Grid container justifyContent="center">
            <Grid item >
              <Typography variant="h4" justifyContent="center"  style={{ textAlign: "center", color:"white" }}>
                검색중 입니다. <CircularProgress />{" "}
              </Typography>
            </Grid>
          </Grid>
        ) : selectList.length !== 0 ? (
          // 검색 결과 창
          currentPosts(selectList).map((data, idx) => (
            <Grid
              container
              component={Link}
              to={`/WatchPage2/${data.v_code}`}
              style={{
                textDecoration: "none",
                marginBottom: 10,
                marginLeft: 30,
              }}
            >
              <Grid item xs={5}>
                <Box>

                  <img src={data.v_img} width="100%" />
                </Box>
              </Grid>

              <Grid item xs={4} style={{ marginLeft: 10 }}>
                <Box style={{ width: "800px" }}>
                  <Typography variant="h5" style={{ color: "white" }}>
                    {data.v_name}
                  </Typography>
                  <br />

                  <Typography variant="body1" style={{ color: "gray" }}>
                    {data.v_date}
                  </Typography>

                  <Typography variant="body1" style={{ color: "gray" }}>
                    조회수 {data.v_views} 회
                  </Typography>
                  <br />

                  <Typography variant="body1" style={{ color: "gray" }}>
                    {data.v_descript}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          ))
        ) : (
          <div  style={{width:'100%', marginTop: "17vh",alignItems:'center'}}>
            {/* 검색 결과가 없을 경우 */}
              <div style={{display:'flex', justifyContent:'center',alignItems:'center',color:'white'}}>
                <HelpOutline style={{ width: 300, height: 300 }} />
              </div>
              <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center', color:'white'}}>
                <Typography variant="h3">검색 결과가 없습니다.</Typography>             
              </div>
          </div>
        )}
       {/* 페이징 */}
       {load !== 0 && selectList.length !== 0 && 
       <div style={{ width:'100%',justifyContent:'center',display:'flex',position:'fixed', bottom:0}}>        
      <PageUl style={{ marginTop: 20, marginBottom: 20, justifyContent:'center',display:'flex' }}>
        { currentPage > 1 &&
          <PageLi onClick={backbutton} >
        <PageSpan>
          <NavigateBeforeIcon/>
          </PageSpan>
        </PageLi>       
        }
      </PageUl>
      
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={selectList.length}
          paginate={setCurrentPage}
          myList={currentPosts(selectList)}
        ></Pagination>
        <PageUl style={{ marginTop: 20, marginBottom: 20,justifyContent:'center',display:'flex' }}>
        {  currentPage < 1 &&
        <PageLi onClick={nextbutton}>
          <PageSpan>
            <NavigateNextIcon/>
            </PageSpan>
          </PageLi>
          } 
        </PageUl>
      </div>}
    </Grid>

   
      </>
  );
};

export default SearchResultContainer;
