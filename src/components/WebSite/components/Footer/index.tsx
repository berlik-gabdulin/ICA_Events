import { FC } from 'react';
import { FooterWrapper } from './style';
import { TFooter } from 'src/utils/types';

const Footer: FC<TFooter> = ({ content }) => {
  console.log(content);
  return <FooterWrapper dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Footer;
