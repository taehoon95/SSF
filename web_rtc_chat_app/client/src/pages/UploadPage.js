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
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "../../node_modules/axios/index";
import { Container } from "../../node_modules/@material-ui/core/index";


const UploadPage = () => {
  const u_id = localStorage.getItem("u_id");
  const [selectedVFile, setSelectedVFile] = useState(null); // 동영상
  const [selectedIFile, setSelectedIFile] = useState(null); // 이미지
  const [selectCategory, setSelectCategory] = useState(""); // 카테고리
  const [inputTitle, setInputTitle] = useState(""); // 제목
  const [inputContent, setInputContent] = useState(""); // 내용

  // 제목 입력
  const handleTitle = (e) => {
    setInputTitle(e.target.value);
    console.log(e.target.value);
  };

  // 내용 입력
  const handleContent = (e) => {
    setInputContent(e.target.value);
    console.log(e.target.value);
  };

  // S3에 동영상 올리기
  const handleVideoChange = (e) => {
    console.log(e.target.files[0]);
    setSelectedVFile(e.target.files[0]);
  };

  // S3에 이미지 올리기
  const handleImgChange = (e) => {
    console.log(e.target.files[0]);
    setSelectedIFile(e.target.files[0]);
  };

  // 카테고리 선택
  const selectChange = (e) => {
    setSelectCategory(e.target.value);
    console.log(e.target.value);
  };

  // 20211123 이태훈 동영상, 이미지 업로드 api
  // 20211124 윤성준 동영상, 이미지, 제목, 내용, 카테로그 api
  const handleFileUpload = () => {
    console.log("저장");
    const videoData = new FormData();
    const imgData = new FormData();

    videoData.append("file", selectedVFile, selectedVFile.name);
    imgData.append("file", selectedIFile, selectedIFile.name);
    console.log(selectedVFile);
    console.log("-----------------");
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

    console.log(selectCategory);
    console.log(inputTitle);
    console.log(inputContent);

    console.log("------------------------");
    const url = "https://ssfupload.s3.ap-northeast-2.amazonaws.com/static/";
    console.log(url + selectedVFile.name);
    const v_link = url + selectedVFile.name;
    const v_img = url + selectedIFile.name;
    console.log(url + selectedIFile.name);
    console.log("------------------------");

    axios
      .post(`/api/videoUpload`, {
        u_id,
        c_code: selectCategory,
        v_name: inputTitle,
        v_descript: inputContent,
        v_link,
        v_img,
      })
      .then((response) => {
        console.log(response);
        alert("업로드 성공");
      })
      .catch((error) => {
        alert("업로드 실패");
        console.log(error);
      });
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="sm"
        style={{
          background: "#FFFFFF",
          borderRadius: 5,
          marginTop: 100,
          marginBottom: 50,
        }}
      >
        {/* 제목 입력 */}
        <div align="left" >
          <Typography textAlign="left" variant="h5" >
            제목
          </Typography>
          <TextField
            variant="outlined"
            onChange={handleTitle}
            value={inputTitle}
            style={{ width: 550 }}
            required
            type="text"
            placeholder="제목을 입력하세요."
          />
        </div>
        <br />
        <br />

        {/* 내용 입력 */}
        <div>
          <Typography variant="h5">내용</Typography>
          <TextField
            variant="outlined"
            onChange={handleContent}
            value={inputContent}
            style={{ width: 550 }}
            required
            type="text"
            placeholder="내용을 입력하세요."
            multiline
            rows={8}
          />
        </div>
        <br />
        <br />

        {/* file타입 옆에 multiple 옵션 넣어주면 다중선택 가능 */}
        {/* 비디오 선택 */}
        <div align="left">
          <Typography variant="h5">동영상 파일 선택</Typography>
          <Input
            type="file"
            required
            onChange={handleVideoChange}
            style={{ width: 550 }}
          />
        </div>
        <br />
        <br />

        {/* 이미지 선택 */}
        <div align="left">
          <Typography variant="h5">썸네일 파일 선택</Typography>
          <Input
            type="file"
            required
            onChange={handleImgChange}
            style={{ width: 550 }}
          />
        </div>
        <br />
        <br />

        {/* 카테고리 선택 */}
        <div align="left">
          <Typography variant="h5">카테고리 선택</Typography>
          <Select
            style={{ width: 550, height: 40 }}
            onChange={selectChange}
            value={selectCategory}
          >
            <MenuItem value="NT001">자연</MenuItem>
            <MenuItem value="VL001">브이로그</MenuItem>
            <MenuItem value="GM001">게임</MenuItem>
            <MenuItem value="SP001">스포츠</MenuItem>
            <MenuItem value="MC001">음악</MenuItem>
            <MenuItem value="AM001">동물</MenuItem>
            <MenuItem value="HH001">운동</MenuItem>
            <MenuItem value="CK001">요리</MenuItem>
          </Select>
        </div>
        <br />
        <br />

        {/* 업로드 버튼 */}
        <Button
          variant="contained"
          onClick={handleFileUpload}
          style={{ width: 550, height: 40, marginBottom: 50 }}
        >
          업로드
        </Button>
      </Container>
    </>
  );
};

export default UploadPage;
