import React, { ReactElement } from 'react';
import { CircularProgress, Box } from '@mui/material';

interface LoaderProps {
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }): null | ReactElement =>
  loading ? (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.7)', // белый прозрачный слой
        backdropFilter: 'blur(10px)', // размытие под слоем
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <CircularProgress size={50} color="secondary" />
      </Box>
    </div>
  ) : null;

export default Loader;
