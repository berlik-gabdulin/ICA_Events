import styled from '@emotion/styled';
import { Box } from '@mui/material';
import palette from 'src/theme/palette';

export const MemberBox = styled(Box)`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TextBox = styled(Box)`
  width: 50%;
  padding-right: 30px;
  font-size: 72px;
  font-family: 'Gilroy';
  line-height: 1.121;
  text-align: right;
  color: ${palette.light.primary.dark};
  @media screen and (max-width: 768px) {
    padding-right: 0;
    width: 100% !important;
    margin-bottom: 30px;
    text-align: center;
    font-size: 42px;
  }
`;

export const LogoBox = styled(Box)`
  width: 50%;
  padding-left: 30px;
  @media screen and (max-width: 768px) {
    width: 100% !important;
    padding-left: 0px;
    text-align: center;
    img {
      max-width: 300px !important;
    }
  }
`;
