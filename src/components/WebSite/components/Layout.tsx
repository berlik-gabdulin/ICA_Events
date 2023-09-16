import { FC, ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import { TLayoutProps } from 'src/utils/types';
import MetaHead from 'src/components/MetaHead';

const Layout: FC<{ data: TLayoutProps; children: ReactNode }> = ({ data, children }) => (
  <>
    <MetaHead meta={data.meta} />
    <Header social={data.social} navigation={data.navigation} />
    {children}
    <Footer content={data.footer} />
  </>
);

export default Layout;
