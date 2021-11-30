//2021-11-26
// 비디오 업로드 수정
//박진현

import React, { useEffect, useState } from 'react';

import {
    Button,
  FormControl,
  Grid,
  Input,
  MenuItem,
  Select,
  Typography,
  } from "@mui/material";
import { useParams } from 'react-router';
import axios from 'axios';
const ListChangeContainer = () => {
    const [selectList, setSelectList] = useState([]);
    const [selectCategory, setSelectCategory] = useState(""); // 카테고리
    const { v_code } = useParams();

    const [v_name, setV_name] = useState("");
    const [c_code, setC_code] = useState("");
    const [v_descript, setV_descript] = useState("");
    const [c_name, setC_name] = useState("");

    // 바꾸는 부분
    const onChange = (e) =>{
     console.log(e.target.id);
     
    
      setV_descript(e.target.value);
    }
    const onChange1 = (e) =>{
       
      setV_name(e.target.value);
   
    }

 // 카테고리 선택
    const selectChange = (e) => {
      setSelectCategory(e.target.value);  
  

    };
    //수정 버튼
    const onUpdate = (e) =>{
      axios.patch(`/api/videoupdate`, { v_code, c_code:selectCategory, v_name:v_name, v_descript:v_descript})
      .then((response) => {
        console.log(response);
        alert("업로드 성공");
      })
      .catch((error) => {
        alert("업로드 실패");
        console.log(error);
      });    };
    
   

  useEffect(()=>{
    myVideoListchange();
    console.log(selectList);
  },[selectList]);

  const myVideoListchange = () =>{
    axios.get(`/api/videochangeserch/${v_code}`)
    .then((response) =>{      
      setV_name(response.data[0].v_name);      
      setC_code(response.data[0].c_code);      
      setV_descript(response.data[0].v_descript);   
      setC_name(response.data[0].c_name);
    })
    .catch((error) =>{
      alert('실패');
      console.log(error);      
    });
  };

    return (
      <>

         <Grid container style={{ marginTop: 65 }}>

        {/* 제목 입력 */}
        <Grid item xs={12} align="left">
          <Typography variant="h4">제목</Typography>
          <Input
            style={{ width: 1200, height: 80 }}
            required
            type="text"
            onChange={onChange1}
            name="title"
            id="title"
            value={v_name}
        >             
        </Input>
        </Grid>
        {/* 내용 입력 */}
        <Grid item xs={12} align="left">
          <Typography variant="h4">내용</Typography>
          <Input
            style={{ width: 1200, height: 200 }}
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
        <Grid item>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select onChange={selectChange} value={selectCategory}>
              <MenuItem value="NT001" id="NT001">자연</MenuItem>
              <MenuItem value="VL001" id="VL001">브이로그</MenuItem>
              <MenuItem value="GM001" id="GM001">게임</MenuItem>
              <MenuItem value="SP001" id="SP001">스포츠</MenuItem>
              <MenuItem value="MC001" id="MC001">음악</MenuItem>
              <MenuItem value="AM001" id="AM001">동물</MenuItem>
              <MenuItem value="HH001" id="HH001">운동</MenuItem>
              <MenuItem value="CK001" id="CK001">요리</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* 수정 버튼 */}
        <Grid item xs={12} align="center">
          <Button variant="contained" onClick={onUpdate}>
            수정
          </Button>
          
        </Grid>
      </Grid>      
    
       </>
    );
};

export default ListChangeContainer;

