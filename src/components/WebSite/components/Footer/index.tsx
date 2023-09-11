import { FC } from 'react';
import { FooterWrapper } from './style';
import { TFooter } from 'src/utils/types';

const Footer: FC<TFooter> = ({ content }) => (
  <FooterWrapper dangerouslySetInnerHTML={{ __html: content }} />
);

export default Footer;
