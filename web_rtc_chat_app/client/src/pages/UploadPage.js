//영상 등록 페이지
//내가 올리는 영상 CRUD
//2021-11-13
// 20211116 이태훈
// S3에 영상 올리기 테스트

//2021-11-17
// 윤성준 - Header, Footer 격자 나누기

import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
} from "../../node_modules/@material-ui/core/index";
import axios from "../../node_modules/axios/index";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import { showTest } from "../lib/api/showTest";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    console.log("저장");
    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);
    console.log(selectedFile);
    // upload(formData)
    // .then(res => console.log(res))

    axios
      .post("http://localhost:8080/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const onClick = () => {
    console.log(111);
    showTest().then((res) => console.log(res));
  };

  return (
    <>
      <Header />
      <Container>
        <Grid container justify="center" style={{ marginTop: 65 }}>
          <Grid item xs={12}>
            <input type="file" onChange={handleFileChange} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleFileUpload}>
              업로드
            </Button>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
};

export default UploadPage;
