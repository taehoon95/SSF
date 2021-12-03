//2021-11-23
//아이디찾기
//박진현

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { change, idcheck } from "../../modules/auth";
import { withRouter } from "react-router";
import Container from "@mui/material/Container";
import {
  Avatar,
  Box,
  Grid,
  TextField,
  Typography,
} from "../../../node_modules/@material-ui/core/index";
import { LockOutlined } from "../../../node_modules/@mui/icons-material/index";
import Button from "@mui/material/Button";
import { Link,useHistory } from "react-router-dom";



const IdCheckContainer = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const { u_name, u_email, check, checkError } = useSelector((state) => {
    return {
      u_name: state.auth.u_name,
      u_email: state.auth.u_email,
      check: state.auth.check,
      checkError: state.auth.checkError,
    };
  });
  const onChange = (e) => {
    console.log("이건 체인지");

    const { name, value } = e.target;
    console.log(value);

    dispatch(
      change({
        name,
        value,
      })
    );
  };
  const onsubmit = (e) => {
    e.preventDefault();
    dispatch(
      idcheck({
        u_name,
        u_email,
      })
    );
  };
  useEffect(() => {
    if (checkError) {
      setError("아이디 찾기 실패");
      return;
    }
    if (check) {
      console.log("아이디 찾기 성공");
      history.push("/IdCheckViewPage");
    }
  }, [check, checkError]);

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
            marginTop: 150,
          }}
        >
          <form
            onSubmit={onsubmit}
            //   component="main"
            //   maxWidth="xs"
            //   style={{ background: "#303030", borderRadius: 5, marginTop: 150 }}
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
                아이디찾기
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
                  placeholder="  이름"
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="u_name"
                  name="u_name"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item style={{ marginTop: 5, width: "100%" }}>
                <Typography variant="h6" style={{ color: "black" }}>
                  이메일
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
                  id="u_email"
                  name="u_email"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>

            <Grid>
              <Grid item>
                <Typography variant="22">
                  <span>{error}</span>
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
              아이디찾기
            </Button>
            {/* </Box> */}
          </form>
        </Container>
        
     
      </ThemeProvider>
    </div>
  );
};

export default IdCheckContainer;
