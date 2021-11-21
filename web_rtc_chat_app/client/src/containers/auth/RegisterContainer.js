//2021-11-16
//회원가입 UI ing~

// 아이디, 비밀번호, 이름, 생년월일, 성별, 이메일 , 휴대전화

//2021-11-18 강동하 회원가입 구현

//2021-11-19 강동하 이메일 인증 구현
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change, numberAuth, register_Action, id_check } from "../../modules/register";
import { ThemeProvider } from "styled-components";
import { createTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "../../../node_modules/@material-ui/core/index";
import { LockOutlined } from "../../../node_modules/@material-ui/icons/index";
import axios from "../../../node_modules/axios/index";


const RegisterContainer = () => {
  // 2021--11-19 유효성 검사
  const [resultid, setResultId] = useState(0); // 아이디 결과
  const [resultpwd, setResultPwd] = useState(0); // 비밀번호 결과
  const [resultpwdcheck, setResultPwdCheck] = useState(0); // 비밀번호 확인 결과
  const [resultname, setResultName] = useState(0); // 이름 결과
  const [resultbirth, setResultBirth] = useState(0); // 생년월일 결과
  const [resultgender, setResultGender] = useState(0); // 성별 결과
  const [resultemail, setResultEmail] = useState(0); // 이메일 결과
  const [resultemailcheck, setResultEmailCheck] = useState(0); // 이메일 인증 결과
  const [resulttell, setResultTell] = useState(0); //전화번호 결과

  // 이메일인증 값
  //const [number, setNumber] = useState([]);

  const [emaildata, setEmailData] = useState(null);

  // 2021-11-19 강동하 정규표현식 체크
  const [idcheck, setIdCheck] = useState("아이디를 입력 해주세요.");
  const [pwdcheck, setPwdCheck] = useState("비밀번호를 입력 해주세요.");
  const [pwdcheckcheck, setPwdCheckCheck] =
    useState("비밀번호를 재입력 해주세요.");
  const [namecheck, setNameCheck] = useState("이름를 입력 해주세요.");
  const [birthcheck, setBirthCheck] = useState("생년월일을 선택 해주세요.");
  const [gendercheck, setGenderCheck] = useState("성별을 선택 해주세요.");
  const [emailcheck, setEmailCheck] = useState("이메일을 입력 해주세요.");
  const [emailcheckcheck, setEmailCheckCheck] = useState("");
  const [tellcheck, setTellCheck] = useState("전화번호를 입력 해주세요.");

  ///// 이메일 인증 코드 유효성 검증
  const [test, setTest] = useState(false);
  const [numbertest, setNumberTest] = useState(0);

  const dispatch = useDispatch();

  const {
    u_id,
    u_pwd,
    u_pwdcheck,
    u_name,
    u_birth,
    u_gender,
    u_email,
    u_emailcheck,
    u_tell,
    number,
  } = useSelector((state) => {
    return {
      u_id: state.register.u_id,
      u_pwd: state.register.u_pwd,
      u_pwdcheck: state.register.u_pwdcheck,
      u_name: state.register.u_name,
      u_birth: state.register.u_birth,
      u_gender: state.register.u_gender,
      u_email: state.register.u_email,
      u_emailcheck: state.register.u_emailcheck,
      u_tell: state.register.u_tell,
      number: state.register.number,
    };
  });

  const { idcheck2, idcheckError } = useSelector((state) => ({
    idcheck2: state.register.idcheck,
    idcheckError: state.register.idcheckError,
  }));

  const { auth, authError } = useSelector((state) => ({
    auth: state.register.auth,
    authError: state.register.authError,
  }));

  const onChange = (e) => {
    const { id, value } = e.target;
    dispatch(change({ id, value }));
  };

  // 20211118 강동하 회원가입 post
  const onClick = (e) => {
    e.preventDefault();
    if(resultid != 1){
      alert("아이디를 확인해주세요.")
    } else if(resultpwd != 1) {
      alert("비밀번호를 확인해주세요.")
    } else if(resultpwdcheck != 1) {
      alert("비밀번호 확인을 재입력해주세요.")
    } else if(resultname != 1) {
      alert("이름을 확인해주세요.")
    } else if(resultbirth != 1) {
      alert("생년월일을 확인해주세요.")
    } else if(resultgender != 1) {
      alert("성별을 확인해주세요.")
    } else if(resultemail != 1) {
      alert("이메일을 확인해주세요.")
    } else if(resultemailcheck != 1) {
      alert("이메일 인증 번호를 확인해주세요.")
    } else if(resulttell != 1) {
      alert("전화번호를 확인해주세요.")
    } else {
      alert("회원가입 시도");
      dispatch(
        register_Action({
          u_id,
          u_pwd,
          u_name,
          u_birth,
          u_gender,
          u_email,
          u_tell,
        })
      );
    }
  };
  // 20211120 강동하 id 중복체크
  const onIdCheck = () => {
    alert('중복체크 시도');
    dispatch(id_check({
       u_id
      })
    );
  };


  useEffect(() => {
    // if (idcheckError) {
    //   alert(idcheckError + " 에러발생");
    //   console.log(idcheckError);
    //   return;
    // }
    // if (idcheck2) {
    //   alert("사용할 수 있는 아이디입니다.");
    //   console.log(idcheck2);
    // }
    onKeyUpID();
  }, [idcheck2, idcheckError]);


  useEffect(() => {
    if (authError) {
      alert(authError + " 에러발생");
      console.log("오류");
      console.log(authError);
      return;
    }
    if (auth) {
      alert("회원가입이 되었습니다.");
      console.log("회원가입 성공");
      console.log(auth);
    }
  }, [auth, authError]);

  useEffect(() => {
    onKeyUpID();
  }, []);

  useEffect(() => {
    onKeyUpBirth();
  }, [u_birth]);

  useEffect(() => {
    onKeyUpGender();
  }, [u_gender]);

  useEffect(() => {
    onKeyUpEmailCheck();
  }, [u_emailcheck]);

  useEffect(() => {
    setNumberTest(number);
  }, [number]);

  useEffect(() => {
    
  }, [test]);

  // 인증 이메일 전송
  const onEmailClick = (e) => {
    console.log(u_email);
    if(resultemail == 1) {
      alert("email 전송");
      try {
        axios
          .post("https://localhost:5000/api/email", { u_email })
          .then((response) => {
            console.log(response.data.number);
            const a = response.data.number;
            console.log(a);
            //setNumber({ ...response.data.number, number : response.data.number });
            //setNumber(number => [...number, response.data.number]);
            dispatch(numberAuth({ a }));
          })
          .catch((error) => {
            console.log(error);
          });
        setEmailData(emailchecked);
        setTest(true);
      } catch (error) {
        console.log(error);
      }
    }
    else {
      alert("메일전송 실패. \n이메일을 올바르게 입력해주세요.");
    }
  };

  // id 유효성 검증
  // 알파벳이나 숫자 4 ~ 25 글자
  const onKeyUpID = () => {
    let idPattern = /^[a-zA-z0-9]{4,25}$/;
    if (idPattern.test(u_id) === true) {
      console.log(idcheck2);
      console.log(resultid);
      if ((idcheck2 != null) && (idcheckError == null)) {
        alert("사용 가능한 아이디입니다.")
        setIdCheck("사용 가능한 아이디입니다.");
        setResultId(1);
      } else if(idcheckError != null) {
        setIdCheck("사용중인 아이디입니다.");
        setResultId(0);
      } 
      else {
        //alert("1")
        setIdCheck("중복체크를 진행해주세요.");
        setResultId(0);
      }
    } else {
      setIdCheck("아이디는 알파벳 4자에서 25자 사이어야 합니다.");
      setResultId(0);
    }
  };
  // pwd 유효성 검증
  // 알파벳, 특수문자, 숫자 포함 8 ~ 16 글자
  const onKeyUpPWD = () => {
    let pwdPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (pwdPattern.test(u_pwd) === true) {
      setPwdCheck("사용가능한 비밀번호입니다.");
      setResultPwd(1);
    } else {
      setPwdCheck("비밀번호는 알파벳, 숫자, 특수문자를 포함해야 합니다.");
      setResultPwd(0);
    }
  };

  // pwd 확인 유효성 검증
  const onKeyUpPWDCheck = () => {
    if (u_pwd === u_pwdcheck) {
      setPwdCheckCheck(null);
      setResultPwdCheck(1);
    } else {
      setPwdCheckCheck("비밀번호가 맞지 않습니다.");
      setResultPwdCheck(0);
    }
  };

  // name 유효성 검증
  // 2글자 이상
  const onKeyUpName = () => {
    let namePattern = /^.{2,}$/;
    if (namePattern.test(u_name) === true) {
      setNameCheck(null);
      setResultName(1);
    } else {
      setNameCheck("2글자 이상 입력해주세요.");
      setResultName(0);
    }
  };
  // birth 유효성 검증
  // 숫자4개-숫자2개-숫자2개
  // 입력 시, date에서 선택 시 이벤트 발생
  const onKeyUpBirth = () => {
    let birthPattern = /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/;
    if (birthPattern.test(u_birth) === true) {
      setBirthCheck(null);
      setResultBirth(1);
    } else {
      setBirthCheck("생년월일을 선택해주세요.");
      setResultBirth(0);
    }
  };
  // 성별
  const onKeyUpGender = () => {
    if (u_gender === "남" || u_gender === "여") {
      setGenderCheck(null);
      setResultGender(1);
    } else {
      setGenderCheck("성별을 선택해주세요.");
      setResultGender(0);
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
    console.log(number);
    console.log(numbertest);
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

  // tel 유효성 검증
  // 숫자 2개 숫자 3~4개 숫자 4개
  const onKeyUpTell = () => {
    let tellPattern = /^\d{3}\d{3,4}\d{4}$/;
    if (tellPattern.test(u_tell) === true) {
      setTellCheck(null);
      setResultTell(1);
    } else {
      setTellCheck("전화번호를 입력해주세요.");
      setResultTell(0);
    }
  };

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

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{
          background: "#FFFFFF",
          borderRadius: 5,
          marginTop: 50,
          marginBottom: 50,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
            style={{ marginTop: 20, color: "303030" }}
          >
            회원가입
          </Typography>

          {/* 여기서부터 텍스트 입력창 */}
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                style={{ color: "303030", marginBottom: -15, marginTop: 10 }}
              >
                아이디
              </Typography>
            </Grid>

            {/* 아이디 입력 텍스트 */}
            <Grid item xs={9}>

              <TextField
                onChange={onChange}
                onKeyUp={onKeyUpID}
                style={{ background: "#FFFFFF", borderRadius: 3}}
                placeholder="  ID"
                margin="normal"
                required
                fullWidth
                autoFocus
                id="u_id"
                autoComplete="id"
              />
            </Grid>

            <Grid item xs={3} style={{ marginTop: 10}}>
              <Button
                onClick={onIdCheck}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                중복 체크
              </Button>
            </Grid>
            <label style={{ color: "red" }}>{idcheck}</label>
          </Grid>

          <Grid container>
            <Grid item style={{ marginTop: 5, width: "100%" }}>
              <Typography variant="h6" style={{ color: "303030" }}>

                비밀번호
              </Typography>
            </Grid>
            <Grid item style={{ width: "100%" }}>
              {/* 비밀번호 입력 텍스트 */}
              <TextField
                onChange={onChange}
                onKeyUp={onKeyUpPWD}
                style={{
                  background: "#FFFFFF",
                  marginTop: 2,
                  borderRadius: 3,
                }}
                placeholder="  Password"
                margin="normal"
                required
                fullWidth
                type="password"
                id="u_pwd"
                autoComplete="current-password"
              />
              <label style={{ color: "red" }}>{pwdcheck}</label>
            </Grid>
          </Grid>

          <Grid container>

            <Grid item style={{ marginTop: 5, width: "100%" }}>
              <Typography variant="h6" style={{ color: "303030" }}>
                비밀번호 확인
              </Typography>
              {/* 비밀번호 입력 텍스트 */}
              <TextField
                onChange={onChange}
                onKeyUp={onKeyUpPWDCheck}

                style={{
                  background: "#FFFFFF",
                  marginTop: 2,
                  borderRadius: 3,
                }}
                placeholder="  Password"
                margin="normal"
                required
                fullWidth
                type="password"

                id="u_pwdcheck"
                autoComplete="current-password"
              />
              <label style={{ color: "red" }}>{pwdcheckcheck}</label>

            </Grid>
          </Grid>

          <Grid container>

            <Grid item style={{ marginTop: 5, width: "100%" }}>
              <Typography variant="h6" style={{ color: "303030" }}>

                이름
              </Typography>
            </Grid>
            <Grid item style={{ width: "100%" }}>
              {/* 이름 입력 텍스트 */}
              <TextField
                onChange={onChange}
                onKeyUp={onKeyUpName}
                style={{
                  background: "#FFFFFF",
                  marginTop: 2,
                  borderRadius: 3,
                }}
                margin="normal"
                required
                fullWidth
                type="text"
                id="u_name"
                autoComplete="current-password"
              />
              <label style={{ color: "red" }}>{namecheck}</label>
            </Grid>
          </Grid>

          <Grid container>

            <Grid item style={{ marginTop: 5, width: "100%" }}>
              <Typography variant="h6" style={{ color: "303030" }}>

                생년월일
              </Typography>
            </Grid>
            <Grid item style={{ width: "100%" }}>
              {/* 생년월일 입력 텍스트 */}
              <TextField
                onChange={onChange}
                onKeyUp={onKeyUpBirth}
                onClick={onKeyUpBirth}
                style={{
                  background: "#FFFFFF",
                  marginTop: 2,
                  borderRadius: 3,
                }}
                margin="normal"
                required
                fullWidth
                type="date"
                id="u_birth"
                autoComplete="current-password"
              />
              <label style={{ color: "red" }}>{birthcheck}</label>
            </Grid>
          </Grid>

          <Grid container>

            <Grid item style={{ marginTop: 5, width: "100%" }}>
              <Typography variant="h6" style={{ color: "303030" }}>

                성별
              </Typography>
            </Grid>
            <Grid item style={{ width: "100%" }}>
              {/* 성별 입력 텍스트 */}
              <input
                onChange={onChange}
                style={{
                  background: "#FFFFFF",
                  marginTop: 2,
                  marginLeft: 5,
                  marginRight: 5,
                  width: 20,
                  height: 20,
                  border: 1,
                }}
                margin="normal"
                required
                fullWidth
                name="u_gender"
                type="radio"
                id="u_gender"
                value="남"
              />
              <label style={{ fontSize: 20, marginBottom: 5 }}>남</label>
              <input
                onChange={onChange}
                style={{
                  background: "#FFFFFF",
                  marginTop: 2,
                  marginLeft: 110,
                  marginRight: 5,
                  width: 20,
                  height: 20,
                  border: 1,
                }}
                margin="normal"
                required
                fullWidth
                name="u_gender"
                type="radio"
                id="u_gender"
                value="여"
              />
              <label style={{ fontSize: 20, marginBottom: 5 }}>여</label>
              <p />
              <label style={{ color: "red" }}>{gendercheck}</label>
            </Grid>
          </Grid>

          <Grid container>

            <Grid item xs={12} style={{ marginTop: 5, width: "100%" }}>
              <Typography variant="h6" style={{ color: "303030" }}>
                이메일
              </Typography>
            </Grid>
            {/* 이메일 입력 텍스트 */}
            <Grid item xs={9} style={{ marginTop: 5, width: "100%" }}>

              <TextField
                onKeyUp={onKeyUpEmail}
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
                id="u_email"
                autoComplete="current-password"
              />
              <label style={{ color: "red" }}>{emailcheck}</label>
            </Grid>

            <Grid item xs={3}>
              <Button
                //onKeyUp={onKeyUpEmailCheck}
                onClick={onEmailClick}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                전송
              </Button>
            </Grid>
            {emaildata}
          </Grid>
          <Grid container>

            <Grid item style={{ marginTop: 5, width: "100%" }}>
              {test && (
                <label style={{ color: "red" }}>{emailcheckcheck}</label>
              )}
              <Typography variant="h6" style={{ color: "303030" }}>

                휴대전화
              </Typography>
            </Grid>
            <Grid item style={{ width: "100%" }}>
              {/* 휴대전화 입력 텍스트 */}
              <TextField

                onKeyUp={onKeyUpTell}

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
                id="u_tell"
                autoComplete="current-password"
              />
              <label style={{ color: "red" }}>{tellcheck}</label>
            </Grid>
          </Grid>

          <Grid
            container
            style={{ marginTop: 20, marginBottom: 30 }}
            spacing={1}
          >
            {/* 취소 버튼 */}
            <Grid item xs={12} sm={6}>
              <Button variant="contained" href="/" fullWidth>
                취소
              </Button>
            </Grid>
            {/* 회원가입 버튼 */}
            <Grid item xs={6}>
              <Button
                onClick={onClick}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                회원가입
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterContainer;