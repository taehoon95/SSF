//2021-11-23
//아이디찾기
//박진현
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Avatar,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { change, pwdcheck, numberAuth,pwdidcheck } from "../../modules/auth";
import { withRouter } from "react-router";
import axios from "axios";
import { Box, Container } from "../../../node_modules/@material-ui/core/index";
import Button from "@mui/material/Button";


const PwdCheckContainer = ({ history }) => {
  const [test, setTest] = useState(false);
  const [numbertest, setNumberTest] = useState(0);
  const [error, setError] = useState(null);
  const [emaildata, setEmailData] = useState(null);
  const [resultemail, setResultEmail] = useState(0); // 이메일 결과
  const [resultemailcheck, setResultEmailCheck] = useState(0); // 이메일 인증 결과
  const [emailcheckcheck, setEmailCheckCheck] = useState("");
  const [emailcheck, setEmailCheck] = useState("이메일을 입력 해주세요.");
  const [idcheck, setIdcheck] = useState(0);
  const [namecheck,setNameCheck] = useState(0);
  const [namecheckerror,setNameCheckError] = useState("");
  const [idcheckerror,setIdcheckError] = useState("");


  const dispatch = useDispatch();
  const { u_name, u_email, u_id, pwd, pwdError, number, u_emailcheck,pwdidError,pwdid } =
    useSelector((state) => {
      return {
        u_name: state.auth.u_name,
        u_id: state.auth.u_id,
        u_email: state.auth.u_email,
        pwd: state.auth.pwd,
        pwdError: state.auth.pwdError,
        u_emailcheck:state.auth.u_emailcheck,
        number: state.auth.number,
        pwdidError:state.auth.pwdidError,
        pwdid:state.auth.pwdid
      };
    });
    const onKeyUpName = (e) =>{
      if(setNameCheck !== 1){
        setNameCheckError("");
      }
      setNameCheck(1);
    }

    const onKeyUpId = (e) =>{
      if(setIdcheck !== 1){
        setIdcheckError("");
      }
      setIdcheck(1);
    }
  const onChange = (e) => {

    const { name, value } = e.currentTarget;
   
    dispatch(
      change({
        name,
        value,
      })
    );
  };
  const onsubmit = (e) => {
    e.preventDefault();        
    // console.log("비밀번호찾기");
    // console.log(idcheck);
    if(resultemailcheck !== 1) {
       if(namecheck == 0)
      {
        setNameCheckError("이름을 입력해주세요");
      }
      else if(idcheck == 0){      
        setIdcheckError("아이디를 입력해주세요");
      }
      return;
    }
    dispatch(      
      pwdcheck({
        u_name,
        u_email,
        u_id,
      })
    );
    
  };



  useEffect(() => {
    if (pwdError) {
      setError("비밀번호 찾기 실패");
      return;
    }
    if (pwd) {
      // console.log("비밀번호 찾기 성공");
      history.push("/PwdCheckViewPage");
    }
  }, [pwd, pwdError]);



  useEffect(() => {
    setNumberTest(number);
  }, [number]);

  // //아이디 찾기
  // useEffect(() => {
  //   if (pwdidError) {
  //     setError("존재하지 않는 아이디");
  //     return;
  //   }
  //   if (pwdid) {
  //     setError("존재 하는 아이디 입니다.")
  //   }
  // }, [pwdid, pwdidError]);


  useEffect(() => {
    onKeyUpEmailCheck();
  }, [u_emailcheck]);


  useEffect(() => {
  }, [test]);
  const emailchecked = (
    <>
      <Grid item xs={12} style={{ marginTop: 5, width: "100%" }}>
        <Typography variant="h6" style={{ color: "303030" }}>
          이메일 인증 번호를 입력하세요
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ marginTop: 5, width: "100%" }}>
        <TextField
          //onKeyUp={onKeyUpEmailCheck}
          onChange={onChange}
          style={{
            background: "#FFFFFF",
            marginTop: 2,
            borderRadius: 3,
          }}
          margin="normal"
          required
          fullWidth
          type="text"
          id="u_emailcheck"
          autoComplete="current-password"
        />
      </Grid>
      
      {/* <label style={{ color: "red" }}>{emailcheckcheck}</label> */}
    </>
  );

  // 인증 이메일 전송
  const onEmailClick = (e) => {
    // console.log(u_email);
    if (resultemail == 1) {
      // alert("Email 전송 완료");
      try {
        axios
          .post("https://localhost:5000/api/email", { u_email })
          .then((response) => {
            // console.log(response.data.number);
            const a = response.data.number;
            // console.log(a);
            //setNumber({ ...response.data.number, number : response.data.number });
            //setNumber(number => [...number, response.data.number]);
            dispatch(numberAuth({ a }));
          })
          .catch((error) => {
            // console.log(error);
          });

        setEmailData(emailchecked);
        setTest(true);
      } catch (error) {
        // console.log(error);
      }
    } else {
      // alert("메일전송 실패. \n이메일을 올바르게 입력해주세요.");
    }
  };
  

  // email 유효성 검증
  // 알파벳,숫자 + @ + 알바벳 + . + 알파벳
  const onKeyUpEmail = () => {
    let emailPattern =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (emailPattern.test(u_email) === true) {
      setEmailCheck(null);
      setResultEmail(1);
    } else {
      setEmailCheck("이메일을 입력해주세요.");
      setResultEmail(0);
    }
  };

  // email 인증 코드 유효성 검증
  // 숫자 6개
  // 인증 값 맞으면 ok
  //
  const onKeyUpEmailCheck = () => {
    // console.log(number);
    // console.log(numbertest);
    let emailcheckPattern = /^[0-9]{6}$/;
    if (emailcheckPattern.test(u_emailcheck) === true) {
      if (number == u_emailcheck) {
        setEmailCheckCheck(null);
        setResultEmailCheck(1);
      } else {
        setEmailCheckCheck("이메일 인증번호를 다시 입력해주세요.");
        setResultEmailCheck(0);
      }
    } else {
      setEmailCheckCheck("이메일 인증번호를 입력해주세요.");
      setResultEmailCheck(0);
    }
  };


  const theme = createTheme();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xs"
          style={{
            background: "#FFFFFF",
            borderRadius: 5,
            marginTop: 100,
          }}
        >
            {/* <Box

          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        > */}

            <Box
              sx={{
                flexDirection: "column",
                alignItems: "center",
                marginTop: 8,
                display: "flex",
              }}
            >
              <Avatar
                sx={{ m: 1, bgcolor: "secondary.main" }}
                style={{ marginTop: 20 }}
              >
                <LockOutlined />
              </Avatar>
              <Typography
                component="h1"
                variant="h4"
                style={{ marginTop: 20, color: "black" }}
              >
                비밀번호찾기
              </Typography>
            </Box>

            <Grid container>
              <Grid item style={{ marginTop: 5, width: "100%" }}>
                <Typography variant="h6" style={{ color: "black" }}>
                  이름
                </Typography>
                <TextField
                  onChange={onChange}
                  style={{
                    background: "#FFFFFF",
                    marginTop: 2,
                    borderRadius: 3,
                  }}
                  placeholder="이름"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="u_name"
                  name="u_name"
                  autoComplete="current-password"
                  onKeyUp={onKeyUpName}

                />
              </Grid>
              <span style={{color:"red"}}>{namecheckerror}</span>
            </Grid>
            <Grid container>

              <Grid item style={{ marginTop: 5, width: "100%" }}>
                <Typography variant="h6" style={{ color: "black" }}>
                  아이디
                </Typography>
                <TextField
                  onChange={onChange}
                  style={{
                    background: "#FFFFFF",
                    marginTop: 2,
                    borderRadius: 3,
                  }}
                  placeholder="아이디"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="u_id"
                  name="u_id"
                  autoComplete="current-password"
                  onKeyUp={onKeyUpId}
                />
              </Grid>
                <span style={{color:"red"}}>{idcheckerror}</span>
            </Grid>

            <Grid container>
              <Grid item  style={{ marginTop: 5, width: "100%" }}>

                <Typography variant="h6" style={{ color: "black" }}>
                  본인 확인 이메일
                </Typography>


                <Grid item>
                <TextField
                  onKeyUp={onKeyUpEmail}
                  onChange={onChange}
                  style={{
                    background: "#FFFFFF",
                    marginTop: 2,
                    borderRadius: 3,
                  }}
                  placeholder="  이메일"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="u_email"
                  name="u_email"
                  autoComplete="current-password"
                />
                <span style={{color:"red"}}>{emailcheckcheck}</span>
                <Button
                  onClick={onEmailClick}
                  style={{ marginTop: 10, marginBottom: 20, height: 40 }}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  이메일인증
                </Button>
                
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ marginTop: 5, width: "100%" }}>
                <Typography variant="h6" style={{ color: "black" }}>
                  이메일 인증 코드
                </Typography>
                <TextField
                  onChange={onChange}
                  style={{
                    background: "#FFFFFF",
                    marginTop: 2,
                    borderRadius: 3,
                  }}
                  placeholder="  이메일"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="u_emailcheck"
                  name="u_emailcheck"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
         
            <Grid>
              <Grid item>
                <Typography variant="22">
                  <span style={{color:"red"}}>{error}</span>
                </Typography>
              </Grid>
            </Grid>

            <Button
              style={{ marginTop: 10, marginBottom: 40 }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onsubmit}
            >
              비밀번호찾기
            </Button>
            {/* </Box> */}

        </Container>
      </ThemeProvider>
    </div>
  );
};

export default withRouter(PwdCheckContainer);
