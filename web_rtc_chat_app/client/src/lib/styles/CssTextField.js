import React from "react";
import { styled } from '@mui/material/styles';
import { TextField } from "../../../node_modules/@material-ui/core/index";
// 2021-12-01 강동하 커스텀 텍스트 필드 css
export const CssTextField = styled(TextField)({
    '& label': {
      color: 'gray',
    },
    '& label.Mui-focused': {
      color: 'blue',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'blue',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'gray',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'blue',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
    input : {
      color: '#ffffff',
    }
  });