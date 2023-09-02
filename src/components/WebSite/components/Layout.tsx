import { FC, ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer
      content="Copyright © 2021 ICA (JV) LTD – ICA Group. Company number 11499614. All right reserved. Cookie
      and Privacy Policy."
    />
  </>
);

export default Layout;
