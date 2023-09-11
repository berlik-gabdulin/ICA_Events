import React from 'react';
import { fetchAllAboutPageBlocks, fetchHomePageBlock } from 'src/utils/api';
import { TAboutPage, TLayoutProps, TMetaFields, TPageType, TTitleBlock } from 'src/utils/types';
import Layout from 'src/components/WebSite/components/Layout';
import BGBox from 'src/components/WebSite/components/BGBox';
import styled from '@emotion/styled';
import { Container, Section, Title } from 'src/components/globalStyles';
import { fetchLayoutData } from 'src/utils/fetchLayoutData';
import MetaHead from 'src/components/MetaHead';

type TAboutPageProps = {
  content: TPageType<TAboutPage>;
  meta: TPageType<TMetaFields>;
  bgBox: TPageType<TTitleBlock>;
  layoutData: TLayoutProps;
};

const Solutions = (props: TAboutPageProps) => {
  const { meta, content, bgBox, layoutData } = props;

  const { title, bgImage } = bgBox.content;

  const { page_title } = meta.content;

  const { text, image } = content.content;

  return (
    <>
      <MetaHead meta={meta.content} />
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
            <Title>{page_title}</Title>
            <Text dangerouslySetInnerHTML={{ __html: text }} />
          </Container>
        </Section>
      </Layout>
    </>
  );
};

export default Solutions;

export async function getStaticProps() {
  const res = await fetchAllAboutPageBlocks();
  const resTitle = await fetchHomePageBlock('title');
  const layoutData = await fetchLayoutData();

  console.log(res);

  const data: any = {};
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

const Heading = styled.h2`
  color: #fff;
  font-size: 64px;
  line-height: 80px;
  font-family: 'Gilroy-Semibold';
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 36px;
  }
`;

const Text = styled.div`
  font-size: 24px;
  p {
  }
`;
