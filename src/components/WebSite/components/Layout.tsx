import { FC, ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import { TLayoutProps } from 'src/utils/types';

const Layout: FC<{ data: TLayoutProps; children: ReactNode }> = ({ data, children }) => (
    <>
      <Header social={data.social} navigation={data.navigation} />
      {children}
      <Footer content={data.footer} />
    </>
  );

export default Layout;
