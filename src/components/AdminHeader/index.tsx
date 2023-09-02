import { useState } from 'react';
import { IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { Language, Settings, ExitToApp } from '@mui/icons-material';
import { HeaderBox } from './style';

const AdminHeader: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <HeaderBox display="flex" alignItems="center" justifyContent="flex-end">
      <IconButton>
        <Language />
      </IconButton>
      <IconButton onClick={handleMenuOpen}>
        <Avatar />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>
          <Settings />
          Profile Settings
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ExitToApp />
          Logout
        </MenuItem>
      </Menu>
    </HeaderBox>
  );
};

export default AdminHeader;
