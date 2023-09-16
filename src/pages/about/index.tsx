import React from 'react';
import { fetchAllPageData, fetchPageBlock } from 'src/utils/api';
import {
  IData,
  TAboutPage,
  TLayoutProps,
  TMetaFields,
  TPageType,
  TTitleBlock,
} from 'src/utils/types';
import Layout from 'src/components/WebSite/components/Layout';
import BGBox from 'src/components/WebSite/components/BGBox';
import { Container, Section, TitleH1 } from 'src/components/globalStyles';
import { fetchLayoutData } from 'src/utils/fetchLayoutData';
import { Text } from './styles';
import { Heading } from 'src/components/WebSite/components/BGBox/styles';

type TAboutPageProps = {
  content: TPageType<TAboutPage>;
  meta: TPageType<TMetaFields>;
  bgBox: TPageType<TTitleBlock>;
  layoutData: TLayoutProps;
};

const About = (props: TAboutPageProps) => {
  const { meta, content, bgBox, layoutData } = props;

  const { title, bgImage } = bgBox.content;

  const { page_title } = meta.content;

  const { text, image } = content.content;

  return (
    <>
      <Layout data={layoutData}>
        <BGBox
          bgImage={image ? image : bgImage}
          style={{ minHeight: 400 }}
          display="flex"
          alignItems="center"
        >
          <Heading>{title}</Heading>
        </BGBox>
        <Section>
          <Container>
            <TitleH1>{page_title}</TitleH1>
            <Text dangerouslySetInnerHTML={{ __html: text }} />
          </Container>
        </Section>
      </Layout>
    </>
  );
};

export default About;

export async function getStaticProps() {
  const res = await fetchAllPageData('about');
  const resTitle = await fetchPageBlock('home', 'title');
  const layoutData = await fetchLayoutData(res);

  const data: IData = {};
  res.map((block) => {
    data[`${block.block_name}`] = {
      block_title: block.block_title,
      content: JSON.parse(block.content),
    };
  });

  return {
    props: {
      ...data,
      bgBox: {
        block_title: resTitle.block_name,
        content: JSON.parse(resTitle.content),
      },
      layoutData,
    },
  };
}
