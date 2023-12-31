import { Box } from '@mui/material';
import AdminHeader from 'src/components/AdminHeader';
import sidebarConfig from 'src/config/sidebarConfig';
import { NavSectionVertical } from '../nav-section';
import { ContentBox } from './style';
import Snackbar from '../Snackbar';
import styled from '@emotion/styled';

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => (
  <Container display="flex" alignItems="stretch">
    <NavSectionVertical navConfig={sidebarConfig} />
    <Box flexGrow={1} style={{ position: 'relative' }}>
      <AdminHeader />
      <ContentBox>{children}</ContentBox>
      <Snackbar />
    </Box>
  </Container>
);

export default AdminLayout;

const Container = styled(Box)`
  max-width: 1200px;
  margin: 0 auto;
`;
