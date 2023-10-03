import { FC, ReactNode } from 'react';
import Header from './Header';
import MetaHead from 'src/components/MetaHead';
import Footer from './Footer';
import { TLayoutProps } from 'src/utils/types';

const Layout: FC<{ data: TLayoutProps; children: ReactNode }> = ({ data, children }) => (
  <>
    <MetaHead meta={data.meta} />
    <Header social={data.social} navigation={data.navigation} />
    {children}
    <Footer content={data.footer} />
  </>
);

export default Layout;
