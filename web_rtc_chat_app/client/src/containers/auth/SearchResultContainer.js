import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../scroll/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
// 2021-11-25
// 윤성준
// 검색기능 페이지 추가

// 2021-11-29 강동하 로딩 추가
import styled from 'styled-components';

import {
  Box,
  Grid,

  Typography,
} from "../../../node_modules/@material-ui/core/index";
import {
  showInfiniteVideoSearch,
  showInfiniteStreamingSearch,
} from "../../lib/api/StreamingAPI";
import { HelpOutline } from "../../../node_modules/@material-ui/icons/index";
import { useMediaQuery } from "react-responsive";
import { Desktop, Mobile} from "../../pages/WatchPage2"



// 2021-12-03 이태훈 검색시 비디오, 스트리밍 무한 스크롤,
const SearchResultContainer = () => {
  const { v_name } = useParams();
  const [items, setItems] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [streamEnd, setStreamEnd] = useState(false);
  const [searchLength, setSearchLength] = useState(1);
  const [searchLength2, setSearchLength2] = useState(1);



  //console.log(v_name);
  // 스크롤이 어느정도 내려오면 감지 해서 fetchData함수 실행
  console.log(pageNum);
  const fetchData = () => {
    setPageNum(pageNum + 1);
    if (!streamEnd && pageNum !== 0) {
      showInfiniteStreamingSearch(v_name, pageNum).then((res) => {
        if (res.data.length === 0) {
          // console.log(22222); 
          setHasMore(false);
          setLoading(false);
          setStreamEnd(true);

          console.log(items);
          getVideos(items, v_name);
          return;
        }
        return setItems([...items, ...res.data]);
      });
      console.log(items);
      console.log(items.length);
    }
    console.log(pageNum);
    if(streamEnd && pageNum !== 0){

      console.log(pageNum);
      console.log(222);
        showInfiniteVideoSearch(v_name, pageNum).then((res) => {
            setPageNum(pageNum + 1);
            // console.log(pageNum);
            if (res.data.length === 0) {
              setHasMore(false);
              setLoading(false);
              return;
            }
            return setItems([...items, ...res.data])
          });
        }
        console.log(items);
        console.log(items.length);
  };

  // 비디오 값 받아오기

  const getVideos = useCallback((items, v_name) => {
    console.log(items);
    console.log(items.length === 0);
    setSearchLength(items.length);
    console.log(items.length);

    setLoading(true);
    setHasMore(true);
    setPageNum(0);
    showInfiniteVideoSearch(v_name, 0).then((res) => {
      setPageNum(pageNum + 1);
      if(res.data.length === 0 || res.data.length < 5){
        setLoading(false);
        setHasMore(false);
        setItems([...items, ...res.data])
        return;
      }
      return setItems([...items, ...res.data]);
    });
    console.log(items);
    console.log(items.length);
  }, []);

  // 첫 스트리밍 값 받아오기
  const getStreams = useCallback((v_name) => {    setLoading(true);
    setHasMore(true);
    showInfiniteStreamingSearch(v_name, 0).then((res) => {
      if (res.data.length < 5) {
        setSearchLength2(res.data.length);
        getVideos(res.data,v_name);
        console.log(res.data.length);
        setStreamEnd(true);
        return
      }
      setPageNum(pageNum + 1);
      return setItems([...items, ...res.data]);
    });
    console.log(items);
    console.log(items.length);
  }, []);

  // 검색 후 초기화
  useEffect(() => {
    setStreamEnd(false);
    setLoading(true);
    setPageNum(0);
    getStreams(v_name);
    setItems([]);
  }, [v_name]);


  return (
    <>
    <Desktop>    
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMore}
      loader={loading && <Loader />}
      endMessage={<p>End!</p>}
      style={{marginTop: 100}}
    >
      <div className="container">
        <div className="row m-2">
          {items.map((data, idx) => (
            <Grid
              container
              component={Link}
              to={
                (data.v_code && `/WatchPage2/${data.v_code}`) ||
                (data.l_code && `/WatchPage/${data.l_code}`)
              }
              style={{
                textDecoration: "none",
                marginBottom: 10,
                marginTop:25
              }}
              key={idx}
            >
              <Grid item xs={5}>
                <Box>
                  <img
                    src={data.l_img || data.v_img}
                    width="100%"
                    alt={data.l_code || data.v_name}
                  />

                </Box>
              </Grid>

              <Grid item xs={4} style={{ marginLeft: 10 }}>
                <Box style={{ width: "800px" }}>
                  <Typography variant="h5" style={{ color: "white" }}>
                    {data.v_name || data.l_title}
                  </Typography>
                  <br />

                  <Typography variant="body1" style={{ color: "gray" }}>
                    {data.v_date || data.l_date}
                  </Typography>

                  <Typography variant="body1" style={{ color: "gray" }}>
                    {data.v_views && `조회수 ${data.v_views} 회`}
                    {data.l_code && `실시간`}
                  </Typography>
                  <br />

                  <Typography variant="body1" style={{ color: "gray" }}>
                    {data.v_descript}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          ))}
        </div>
      </div>
    </InfiniteScroll>
    {/* 2021-12-04 강동하 검색 결과가 없을 경우 */}
    {(loading === false) && (items.length == 0) && (
    <div  style={{width:'100%', marginTop: "17vh",alignItems:'center'}}>
        <div style={{display:'flex', justifyContent:'center',alignItems:'center',color:'white'}}>
          <HelpOutline style={{ width: 300, height: 300 }} />
        </div>
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center', color:'white'}}>
          <Typography variant="h3">검색 결과가 없습니다.</Typography>             
        </div>
    </div> )}
    </Desktop>
    <Mobile>    
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMore}
      loader={loading && <Loader />}
      endMessage={<p>End!</p>}
    >
      <div className="container">
        <div className="row m-2">
          {items.map((data, idx) => (

            <Grid
              container
              component={Link}
              to={
                (data.v_code && `/WatchPage2/${data.v_code}`) ||
                (data.l_code && `/WatchPage/${data.l_code}`)
              }
              style={{
                textDecoration: "none",
                marginBottom: 10,
                marginTop:25,
                display:"flex",
                flexDirection:"column",
              }}
              key={idx}
            >
              <Grid item xs={5}>
                <Box>
                  <img
                    src={data.l_img || data.v_img}
                    alt={data.l_code || data.v_name}
                    style={{
                      width:"100vw"
                    }

                    }
                  />

                </Box>
              </Grid>

              <Grid item xs={4} style={{ marginLeft: 10 }}>
                <Box style={{ width: "100%"}}>
                  <Typography variant="h5" style={{ color: "gray",width:"95vw" }}>
                    {data.v_name || data.l_title}
                  </Typography>
                  </Box>
                  <br />

                  <Typography variant="body1" style={{ color: "gray",width:"95vw" }}>
                    {data.v_date || data.l_date}
                  </Typography>

                  <Typography variant="body1" style={{ color: "gray",width:"95vw" }}>
                    {data.v_views && `조회수 ${data.v_views} 회`}
                    {data.l_code && `실시간`}
                  </Typography>
                  <br />

                  <Typography variant="body1" style={{ color: "gray",width:"95vw" }}>
                    {data.v_descript}
                  </Typography>
              </Grid>
            </Grid>
          ))}
        </div>
      </div>
    </InfiniteScroll>
    {/* 2021-12-04 강동하 검색 결과가 없을 경우 */}
    {(loading === false) && (items.length == 0) && (
    <div  style={{width:'100%', marginTop: "17vh",alignItems:'center'}}>
        <div style={{display:'flex', justifyContent:'center',alignItems:'center',color:'white'}}>
          <HelpOutline style={{ width: 300, height: 300 }} />
        </div>
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center', color:'white'}}>
          <Typography variant="h3">검색 결과가 없습니다.</Typography>             
        </div>
    </div> )}
    </Mobile>
    </>
    
    )
};

export default SearchResultContainer;
