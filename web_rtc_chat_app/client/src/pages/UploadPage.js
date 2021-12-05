//영상 등록 페이지
//내가 올리는 영상 CRUD
//2021-11-13
// 20211116 이태훈
// S3에 영상 올리기 테스트

//2021-11-17
// 윤성준 - Header, Footer 격자 나누기

//2021-11-29 강동하 텍스트 입력창 유효성 검사
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
import { useHistory } from "react-router-dom";
import { Container, Grid } from "../../node_modules/@material-ui/core/index";
import Header from "../components/common/Header";


const UploadPage = () => {
  const history = useHistory();

  const u_id = localStorage.getItem("u_id");
  const [selectedVFile, setSelectedVFile] = useState(null); // 동영상
  const [selectedIFile, setSelectedIFile] = useState(null); // 이미지
  const [selectCategory, setSelectCategory] = useState(""); // 카테고리
  const [inputTitle, setInputTitle] = useState(""); // 제목
  const [inputContent, setInputContent] = useState(""); // 내용

  // 제목 입력
  const handleTitle = (e) => {
    setInputTitle(e.target.value);
    // console.log(e.target.value);
  };

  // 내용 입력
  const handleContent = (e) => {
    setInputContent(e.target.value);
    // console.log(e.target.value);
  };

  // S3에 동영상 올리기
  const handleVideoChange = (e) => {
    // console.log(e.target.files[0]);
    setSelectedVFile(e.target.files[0]);
  };

  // S3에 이미지 올리기
  const handleImgChange = (e) => {
    // console.log(e.target.files[0]);
    setSelectedIFile(e.target.files[0]);
  };

  // 카테고리 선택
  const selectChange = (e) => {
    setSelectCategory(e.target.value);
    // console.log(e.target.value);
  };

  // 20211123 이태훈 동영상, 이미지 업로드 api
  // 20211124 윤성준 동영상, 이미지, 제목, 내용, 카테로그 api
  // 2021-11-29 강동하 영상 파일이름, 썸네일 파일이름 중복 로직
  const handleFileUpload = (VNumber, INumber) => {
    // console.log("저장");
    // console.log(VNumber);
    // console.log(INumber);
    // console.log(selectedVFile.name);
    // console.log(selectedIFile.name);

    var VResult;
    var IResult;

    if(VNumber != 0) {
      let VFileSplit = selectedVFile.name.split('.');
        for ( let i in VFileSplit ) {
          // console.log(VFileSplit[i]);
        }
      
      VResult = VFileSplit[0].concat(` (${VNumber}).${VFileSplit[1]}`);
    } else {
      VResult = selectedVFile.name;
    }

    // console.log(VResult);

    if(INumber != 0) {
      let IFileSplit = selectedIFile.name.split('.');
        for ( let i in IFileSplit ) {
          // console.log(IFileSplit[i]);
        }
      
      IResult = IFileSplit[0].concat(` (${INumber}).${IFileSplit[1]}`);
    } else {
      IResult = selectedIFile.name;
    }
    // console.log(IResult);

    const videoData = new FormData();
    const imgData = new FormData();

    videoData.append("file", selectedVFile, VResult);
    imgData.append("file", selectedIFile, IResult);
    // console.log(selectedVFile);
    // console.log("-----------------");
    // console.log(selectedIFile);
    const url = "https://ssfupload.s3.ap-northeast-2.amazonaws.com/static/";
    const v_link = url + VResult;
    const v_img = url + IResult;

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
        // alert("업로드 성공");
        history.push('/MyPage');
      })
      .catch((error) => {
        // alert("업로드 실패");
        // console.log(error);
      });

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

    // console.log(selectCategory);
    // console.log(inputTitle);
    // console.log(inputContent);

    // console.log("------------------------");
    // console.log(url + selectedVFile.name);
    // console.log(url + selectedIFile.name);
    // console.log("------------------------");
  };

  // 2021-11-29 강동하 정규표현식 및 중복체크
  const Click = (e) => {
    //console.log(e.currentTarget);
    if (inputTitle == "") {
      e.preventDefault();
      alert("제목을 입력해주세요.");
    } else if (inputContent == "") {
      e.preventDefault();
      alert("내용을 입력해주세요.");
    } else if (selectedVFile == null) {
      e.preventDefault();
      alert("동영상 파일을 선택해주세요.");
    } else if (selectedIFile == null) {
      e.preventDefault();
      alert("이미지 파일을 선택해주세요.");
    } else if (selectCategory == "") {
      e.preventDefault();
      alert("카테고리를 선택해주세요.");
    } else {
      //let videoPattern = /.+(.MP4|.MOV|.WMV|.AVI|.AVCHD|.FLV|.F4V|.SWF|.MKV|.WEBM|.HTML5|.MPEG-2|.VID|.mp4|.mov|.wmv|.avi|.avchd|.flv|.f4v|.swf|.mkv|.webm|.html5|.mpeg-2|.vid)$/;
      // .+ 공백 체크
      //let videoPattern = /.+(.mp4|.mov|.wmv|.avi|.avchd|.flv|.f4v|.swf|.mkv|.webm|.html5|.mpeg-2|.vid)$/;
      let videoPattern = /(.mp4|.mov|.wmv|.avchd|.flv|.f4v|.swf|.mkv|.webm|.html5|.mpeg-2|.vid)$/;
      //let imegePattern = /.+(.PNG|.JPG|.JPEG|.GIF|.BMP|.DIB|.TIF|.TIFF)$/;
      let imegePattern = /(.png|.jpg|.jpeg|.gif|.bmp|.dib|.tif|.tiff)$/;
      if(videoPattern.test(selectedVFile.name) !== true) {
        alert("동영상 파일을 확인해주세요. \n\n사용가능 파일 : MP4, MOV, WMV, AVCHD, FLV, F4V, VID,\n                     SWF, MKV, WEBM, HTML5, MPEG-2");
      }
      else if(imegePattern.test(selectedIFile.name) !== true) {
        alert("이미지 파일을 확인해주세요. \n\n사용가능 파일 : PNG, JPG, JPEG, GIF, BMP, DIB, TIF, TIFF");
      }
      else {
        let videoPreProcess = selectedVFile.name.replace(videoPattern, "");
        let imagePreProcess = selectedIFile.name.replace(imegePattern, "");
        // 영상 제목 중복 체크
        axios.get(`/api/videonamecheck/${inputTitle}`)
          .then((response) => {
            if(response.data.length == 0){
              // 영상 파일이름, 썸네일 파일이름 중복체크
              axios.get(`/api/filename/${videoPreProcess}/${imagePreProcess}`)
              .then(response => {
                let VNumber = response.data[0].body;
                let INumber = response.data[1].body;
                if(VNumber != 0){
                  VNumber = VNumber + 1;
                }
                if(INumber != 0){
                  INumber = INumber + 1;
                }
                console.log(VNumber);
                console.log(INumber);
                handleFileUpload(VNumber, INumber);
              })
              .catch(error => {
                // console.log(error);
              })
            }
            else{
              alert("해당 영상 제목이 존재합니다. \n영상 제목을 변경해주세요.")
            }
          })
          .catch((error) => {
            // console.log(error);
          });
      }
    }
  }

  return (
    <>
      <Header />
      <div>
        <Container
          component="main"
          style={{
            background: "#FFFFFF",
            borderRadius: 5,
            marginTop: 100,
            width: 600,
            height: 715,
            marginBottom: 45,
          }}
        >
          <Grid
            container
            justify="left"
            align="left"
            style={{ marginTop: 130 }}
          >
            {/* 제목 입력 */}
            <Grid item xs={12} style={{ marginTop: 20 }}>
              <Typography textAlign="left" variant="h5">
                제목
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                onChange={handleTitle}
                value={inputTitle}
                style={{ width: 550 }}
                required
                type="text"
                placeholder="제목을 입력하세요."
              />
            </Grid>

            {/* 내용 입력 */}
            <Grid item xs={12} style={{ marginTop: 20 }}>
              <Typography variant="h5">내용</Typography>
            </Grid>
            <Grid itme xs={12}>
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
            </Grid>

            {/* 비디오 선택 */}
            <Grid item xs={12} style={{ marginTop: 30 }}>
              <Typography variant="h5">동영상 파일 선택</Typography>
            </Grid>
            <Grid item xs={12}>
              <Input
                type="file"
                required
                onChange={handleVideoChange}
                style={{ width: 550 }}
              />
            </Grid>

            {/* 이미지 선택 */}
            <Grid item xs={12} style={{ marginTop: 30 }}>
              <Typography variant="h5">썸네일 파일 선택</Typography>
            </Grid>
            <Grid item xs={12}>
              <Input
                type="file"
                required
                onChange={handleImgChange}
                style={{ width: 550 }}
              />
            </Grid>

            {/* 카테고리 선택 */}
            <Grid item xs={12} style={{ marginTop: 20 }}>
              <Typography variant="h5">카테고리 선택</Typography>
            </Grid>
            <Grid item xs={12}>
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

            {/* 업로드 버튼 */}
            <Grid item xs={12} style={{ marginTop: 30 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={Click}
                style={{ width: 550, height: 40, marginBottom: 50, background: "#1565C0", color:"white" }}
                sx={{ mt: 3, mb: 2 }}
              >
                업로드
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default UploadPage;
