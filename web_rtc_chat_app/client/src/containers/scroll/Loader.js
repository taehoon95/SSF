import { memo } from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";
import { Typography } from "../../../node_modules/@material-ui/core/index";

const LoaderWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

// 2021-12-04 강동하 스피너 옆 텍스트 넣음
const Loader = () => {
  return (
    <LoaderWrap>
      <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center', color:'white', marginTop:300}}>
      <Typography variant="h3" style={{ textAlign: "center", color: "white" }}>
        로딩 중 입니다.
      </Typography>
      <ReactLoading type="spin" color="#A593E0" />
      </div>
    </LoaderWrap>
  );
};

export default memo(Loader);