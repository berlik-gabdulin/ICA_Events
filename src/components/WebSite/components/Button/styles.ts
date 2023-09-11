import { Button as MUIButton } from '@mui/material';
import styled from '@emotion/styled';
import palette from 'src/theme/palette';
import { TButton } from 'src/utils/types';

export const ButtonStyled = styled(MUIButton)<TButton>(
  ({ style, variant = 'primary', customcolor }) => {
    const color = customcolor ? customcolor : palette.light.primary.light;

    let styles = {
      border: `2px solid ${color}`,
      borderColor: color,
      backgroundColor: color,
      color: '',
      '&:hover': {
        color: '#000',
        borderColor: color,
        backgroundColor: color,
      },
    };

    if (variant === 'secondary') {
      styles = {
        border: `2px solid ${color}`,
        borderColor: color,
        backgroundColor: color,
        color: '',
        '&:hover': {
          color: '#000',
          borderColor: color,
          backgroundColor: color,
        },
      };
    } else if (variant === 'outlined') {
      styles = {
        border: `2px solid ${color}`,
        borderColor: color,
        backgroundColor: 'transparent',
        color: color,
        '&:hover': {
          color: '#000',
          borderColor: color,
          backgroundColor: color,
        },
      };
    } else if (variant === 'text') {
      styles = {
        border: 'none',
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        color: color,
        '&:hover': {
          color: '#000',
          borderColor: 'none',
          backgroundColor: 'transparent',
        },
      };
    }

    return {
      display: 'flex',
      paddingTop: '12px',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '30px',
      minWidth: '320px',
      height: '80px',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderRadius: '0',
      boxShadow: 'none',
      textTransform: 'uppercase',
      fontFamily: "'Gilroy-Semibold', sans-serif",
      fontSize: '28px',
      transition: 'all 0.2s ease-in-out',
      ...styles,
      ...style,
    };
  }
);
