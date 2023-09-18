import styled from '@emotion/styled';
import { Box } from '@mui/material';
import customTheme from 'src/theme/customTheme';

export const Wrapper = styled(Box)`
  padding: 80px 122px;
  max-width: 50%;
  font-size: 24px;
  color: #fff;
  background-color: ${customTheme.main[100]};
`;

export const Text = styled.div`
  a {
    position: relative;
    color: #fff;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: ${customTheme.light[100]};
    }
  }
`;

export const SocialBox = styled(Box)`
  color: ${customTheme.light[100]};
  svg {
    height: 44px;
    width: 44px;
    transition: all 0.3s ease-in-out;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 44px;
    height: 44px;
    margin-right: 20px;
    color: ${customTheme.light[100]};
    &:hover {
      svg {
        color: #fff;
      }
    }
    &:first-of-type {
      margin-left: -8px;
    }
  }
`;

export const PhotoBox = styled(Box)`
  width: 50%;
  margin-right: -1px;
  position: relative;
  img {
    object-fit: cover;
  }
`;
