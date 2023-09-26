import styled from '@emotion/styled';
import { Box, TextField } from '@mui/material';

export const SearchBox = styled(Box)`
  margin: 40px auto 30px;
  max-width: 840px;
  @media screen and (max-width: 768px) {
    margin: 20px auto 20px;
  }
`;

export const SearchInput = styled(TextField)`
  > div {
    border-radius: 0;
  }
`;

export const SearchLabel = styled.p`
  width: 150px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 100px;
  }
`;

export const GridBox = styled(Box)`
  margin-top: 50px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
