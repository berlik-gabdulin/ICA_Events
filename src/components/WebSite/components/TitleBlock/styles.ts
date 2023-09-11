import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { CSSProperties } from "react";


export const Buttons = styled(Box)`
  display: flex;
  justify-content: space-between;
`;


export const ContainerStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: 'calc(100vh - 320px)',
  maxHeight: '800px',
  minHeight: '300px',
  borderRadius: '40px',
  color: '#fff',
};
