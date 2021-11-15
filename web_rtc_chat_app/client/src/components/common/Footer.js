//푸터 모듈
//2021-11-15
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      {/* 나중에 밑에 링크 주소 바꿔줘야함 11-15일 작성 */}
      <Link color="inherit" href="https://localhost:3000/">
        SSF
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >

      <CssBaseline />

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm" align="center">
          <Typography variant="body1">
            TEL. 010.3488.1034 / 부산광역시 해운대구 우동
          </Typography>
          <Copyright/>
        </Container>
      </Box>
    </Box>
  );
}