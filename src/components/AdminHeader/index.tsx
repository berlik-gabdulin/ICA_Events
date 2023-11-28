import { useEffect, useState } from 'react';
import { IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { Language, Settings, ExitToApp } from '@mui/icons-material';
import { HeaderBox } from './style';
import { useRouter } from 'next/router';

const AdminHeader: React.FC = () => {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/login');
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
        <MenuItem onClick={handleLogout}>
          <ExitToApp />
          Logout
        </MenuItem>
      </Menu>
    </HeaderBox>
  );
};

export default AdminHeader;
