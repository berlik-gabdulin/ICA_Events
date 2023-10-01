import React from 'react';
import db from 'src/utils/db';
import {
  IData,
  IPageBlock,
  TAboutPage,
  TLayoutProps,
  TMetaFields,
  TPageType,
  TTitleBlock,
} from 'src/utils/types';
import Layout from 'src/components/WebSite/components/Layout';
import BGBox from 'src/components/WebSite/components/BGBox';
import { Container, Section, TitleH1, Path } from 'src/components/globalStyles';
import { Text } from '../components/WebSite/pageStyles/stylesAbout';
import { Heading } from 'src/components/WebSite/components/BGBox/styles';
import { RowDataPacket } from 'mysql2';
import PathImg from 'public/assets/arc.png';
import Image from 'next/image';

type TAboutPageProps = {
  page: TPageType<TAboutPage>;
  meta: TPageType<TMetaFields>;
  bgBox: TPageType<TTitleBlock>;
  layoutData: TLayoutProps;
};

const About = (props: TAboutPageProps) => {
  const { meta, page, bgBox, layoutData } = props;

  const { title, bgImage } = bgBox.content;

  const { page_title } = meta.content;

  const { text, image } = page.content;

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
          <Path>
            <Image src={PathImg} layout="fill" alt="Path" />
          </Path>
        </Section>
      </Layout>
    </>
  );
};

export default About;

export async function getStaticProps() {
  // Получение всех данных страницы
  const [pageData] = (await db.execute(
    `SELECT * FROM page_about ORDER BY order_number ASC`
  )) as RowDataPacket[];

  // Получение данных для заголовка
  const [titleData] = (await db.execute(
    `SELECT * FROM page_home WHERE block_name = 'title'`
  )) as RowDataPacket[];

  const [settings] = (await db.execute(
    `SELECT * FROM page_settings ORDER BY order_number ASC`
  )) as RowDataPacket[];

  const settingsData: IData = {};
  settings.map((block: IPageBlock) => {
    settingsData[`${block.block_name}`] = {
      block_title: block.block_title,
      content: JSON.parse(block.content),
    };
  });

  const metaBlock = pageData.find((item: IPageBlock) => item.block_name === 'meta');
  const metaContent = metaBlock ? JSON.parse(metaBlock.content) : null;

  const layoutData = {
    social: settingsData.social?.content?.socialLinks || {},
    footer: settingsData.main?.content?.footer || '',
    navigation: settingsData.navigation?.content?.nav || [],
    meta: metaContent,
  };

  const data: IData = {};
  pageData.map((block: IPageBlock) => {
    data[`${block.block_name}`] = {
      block_title: block.block_title,
      content: JSON.parse(block.content),
    };
  });

  return {
    props: {
      page: data.page,
      meta: data.meta,
      bgBox: {
        block_title: titleData[0].block_name,
        content: JSON.parse(titleData[0].content),
      },
      layoutData,
    },
  };
}
