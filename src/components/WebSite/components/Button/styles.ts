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
      '@media (max-width: 1024px)': {
        fontSize: '24px',
        height: '70px',
        minWidth: '280px',
        paddingTop: '10px',
        marginTop: '25px',
      },
      '@media (max-width: 768px)': {
        fontSize: '20px',
        height: '60px',
        minWidth: '240px',
        paddingTop: '8px',
        marginTop: '20px',
      },
      '@media (max-width: 480px)': {
        fontSize: '16px',
        height: '50px',
        minWidth: '200px',
        paddingTop: '6px',
        marginTop: '15px',
      },
      ...styles,
      ...style,
    };
  }
);
