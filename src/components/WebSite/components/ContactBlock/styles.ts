import styled from '@emotion/styled';
import { Box } from '@mui/material';
import palette from 'src/theme/palette';

export const Wrapper = styled(Box)`
  padding: 80px 122px;
  max-width: 50%;
  font-size: 24px;
  color: #fff;
  background: ${palette.light.primary.dark};
`;

export const Text = styled.div`
  a {
    position: relative;
    color: #fff;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: ${palette.light.primary.light};
    }
  }
`;

export const SocialBox = styled(Box)`
  color: ${palette.light.primary.light};
  svg {
    font-size: 44px;
    transition: all 0.3s ease-in-out;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    margin-right: 20px;
    color: ${palette.light.primary.light};
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
