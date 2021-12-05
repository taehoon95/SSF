//2021-11-26
// 비디오 업로드 수정
//박진현

import React, { useEffect, useState } from "react";

import {
  Button,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";
import axios from "axios";
import {
  Container,
  TextField,
} from "../../../node_modules/@material-ui/core/index";
import { useHistory } from "react-router";
const ListChangeContainer = () => {
  const [selectList, setSelectList] = useState([]);
  const [selectCategory, setSelectCategory] = useState(""); // 카테고리
  const { v_code } = useParams();

  const [v_name, setV_name] = useState("");
  const [c_code, setC_code] = useState("");
  const [v_descript, setV_descript] = useState("");
  const [c_name, setC_name] = useState("");
  const [selectchangevalue,setSelectChangevalue] = useState("");
  const [selectchangevalueerror,setSelectChangevalueError] = useState("");
  const history = useHistory();

  // 바꾸는 부분
  const onChange = (e) => {
    // console.log(e.target.id);
    setV_descript(e.target.value);
  };
  const onChange1 = (e) => {
    setV_name(e.target.value);
  };

  // 카테고리 선택
  const selectChange = (e) => {
    setSelectCategory(e.target.value);
    setSelectChangevalue(1);
  };
  //수정 버튼
  const onUpdate = (e) => {
    if(selectchangevalue == 1){
    axios
      .patch(`/api/videoupdate`, {
        v_code,
        c_code: selectCategory,
        v_name: v_name,
        v_descript: v_descript,
      })
      .then((response) => {
        // console.log(response);
        // alert("업로드 성공");
        history.push('/MyVideoSettingPage');
      })
      .catch((error) => {
        // alert("업로드 실패");
        // console.log(error);
      });
    }
    else{
      setSelectChangevalueError("카테고리를 선택해주세요")
    }
  };

  useEffect(() => {
    myVideoListchange();
    // console.log(selectList);
  }, [selectList]);

  const myVideoListchange = () => {
    axios
      .get(`/api/videochangeserch/${v_code}`)
      .then((response) => {
        setV_name(response.data[0].v_name);
        setC_code(response.data[0].c_code);
        setV_descript(response.data[0].v_descript);
        setC_name(response.data[0].c_name);
      })
      .catch((error) => {
        // alert("실패");
        // console.log(error);
      });
  };

  return (
    <>
      <Container
        component="main"
        style={{
          background: "#FFFFFF",
          borderRadius: 5,
          marginTop: 100,
          width: 600,
          height: 730,
          marginBottom: 45,
        }}
      >
        <Grid container justify="left" align="left" style={{ marginTop: 100 }}>
          {/* 제목 입력 */}
          <Grid item xs={12} style={{ marginTop: 30 }}>
            <Typography textAlign="left" variant="h5">
              제목
            </Typography>
            <Grid item xs={12} style={{ marginTop: 7 }}>
              <TextField
                style={{ width: 550 }}
                required
                type="text"
                onChange={onChange1}
                name="title"
                id="title"
                value={v_name}
                variant="outlined"
              />
            </Grid>
          </Grid>

          {/* 내용 입력 */}
          <Grid item xs={12} style={{ marginTop: 20 }}>
            <Typography variant="h5">내용</Typography>
          </Grid>
          <Grid itme xs={12} style={{ marginTop: 7 }}>
            <TextField
              style={{ width: 550 }}
              variant="outlined"
              required
              type="text"
              placeholder="내용을 입력하세요."
              name="descript"
              id="descript"
              onChange={onChange}
              value={v_descript}
            />
          </Grid>

          {/* 카테고리 선택 */}
          <Grid item xs={12} style={{ marginTop: 20 }}>
            <Typography variant="h5">카테고리 선택</Typography>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 7 }}>
            <Select
              style={{ width: 550 }}
              onChange={selectChange}
              value={selectCategory}
            >
              <MenuItem value="NT001" id="NT001">
                자연
              </MenuItem>
              <MenuItem value="VL001" id="VL001">
                브이로그
              </MenuItem>
              <MenuItem value="GM001" id="GM001">
                게임
              </MenuItem>
              <MenuItem value="SP001" id="SP001">
                스포츠
              </MenuItem>
              <MenuItem value="MC001" id="MC001">
                음악
              </MenuItem>
              <MenuItem value="AM001" id="AM001">
                동물
              </MenuItem>
              <MenuItem value="HH001" id="HH001">
                운동
              </MenuItem>
              <MenuItem value="CK001" id="CK001">
                요리
              </MenuItem>
              <MenuItem value="ED001" id="ED001">
                교육
              </MenuItem>
              <MenuItem value="AN001" id="AN001">
                만화
              </MenuItem>
              <MenuItem value="ME001" id="ME001">
                의료
              </MenuItem>
              <MenuItem value="CM001" id="CM001">
                컴퓨터공학
              </MenuItem>
            </Select>
          </Grid>
          <span style={{color:"red"}}>{selectchangevalueerror}</span>
          {/* 수정 버튼 */}
          <Grid item xs={12} align="center" style={{ marginTop: 30 }}>
            <Button
              style={{
                width: 550,
                height: 50,
                marginTop: 260,
                background: "#1565C0",
                color: "white",
              }}
              sx={{ mt: 3, mb: 2 }}
              fullWidth
              variant="contained"
              onClick={onUpdate}
            >
              수정
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ListChangeContainer;
