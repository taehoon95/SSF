//영상 등록 페이지
//내가 올리는 영상 CRUD
//2021-11-13
// 20211116 이태훈
// S3에 영상 올리기 테스트

//2021-11-17
// 윤성준 - Header, Footer 격자 나누기

import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Input,
  TextField,
  Typography,
} from "../../node_modules/@material-ui/core/index";
import axios from "../../node_modules/axios/index";

const UploadPage = () => {
  const [selectedVFile, setSelectedVFile] = useState(null);
  const [selectedIFile, setSelectedIFile] = useState(null);

  const handleVideoChange = (e) => {
    console.log(e.target.files[0]);
    
    setSelectedVFile(e.target.files[0]);
  };

  const handleImgChange = (e) => {
    console.log(e.target.files[0]);
    
    setSelectedIFile(e.target.files[0]);
  };

  // 20211123 이태훈 동영상 이미지 업로드 api
  const handleFileUpload = () => {
    console.log("저장");
    const videoData = new FormData();
    const imgData = new FormData();
    videoData.append("file", selectedVFile, selectedVFile.name);
    imgData.append("file", selectedIFile, selectedIFile.name);
    console.log(selectedVFile);
    console.log(1);
    console.log(selectedIFile);
    // upload(formData)
    // .then(res => console.log(res))
    axios
      .post("/api/upload", imgData, {
      //.post("https://18.219.234.0:8080/api/upload", imgData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    axios
      .post("/api/upload", videoData, {
      //.post("https://18.219.234.0:8080/api/upload", videoData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };




  
  return (
    <>
        <Grid container style={{ marginTop: 65 }}>
          <Grid item xs={12} align="left">
            <Typography variant="h4" >제목</Typography>
            <Input  placeholder="제목을 입력하세요." />
          </Grid>
          <Grid item xs={12} align="left">
            <Typography variant="h4">내용</Typography>
            <Input  placeholder="내용을 입력하세요." />
          </Grid>
          <Grid item xs={12} >
            {/* file타입 옆에 multiple 옵션 넣어주면 다중선택 가능 */}
            <input type="file" required onChange={handleVideoChange} />
          </Grid>
          <Grid item xs={12}>
            <input type="file" required onChange={handleImgChange} />
          </Grid>
          <Grid item xs={12} align="center">
            <Button variant="contained" onClick={handleFileUpload}>
              업로드
            </Button>
          </Grid>
        </Grid>
    </>
  );
};

export default UploadPage;
