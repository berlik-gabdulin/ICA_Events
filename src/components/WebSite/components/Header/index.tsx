import React from 'react';
import { Box, Typography, IconButton, AppBar, Toolbar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Header = () => {
  // Здесь можно сделать запрос к API для получения данных о меню и социальных сетях
  const menuItems = ['Home', 'About', 'Services', 'Contact'];

  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" flexGrow={1}>
          <Typography variant="h6">Logo</Typography>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box display="flex">
            <IconButton color="inherit">
              <FontAwesomeIcon icon={faFacebook} />
            </IconButton>
            <IconButton color="inherit">
              <FontAwesomeIcon icon={faTwitter} />
            </IconButton>
            <IconButton color="inherit">
              <FontAwesomeIcon icon={faInstagram} />
            </IconButton>
          </Box>
          <Box display="flex">
            {menuItems.map((item, index) => (
              <Typography key={index} variant="body1" style={{ margin: '0 10px' }}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
