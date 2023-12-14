import React, { useState } from 'react';
import {
  IData,
  IPageBlock,
  TContactsPage,
  TLayoutProps,
  TMetaFields,
  TOffice,
  TPageType,
  TTitleBlock,
} from 'src/utils/types';
import Layout from 'src/components/WebSite/components/Layout';
import BGBox from 'src/components/WebSite/components/BGBox';
import { Container, Section } from 'src/components/globalStyles';
import { RowDataPacket } from 'mysql2';
import db from 'src/utils/db';
import { getLayoutData } from 'src/utils/getLayoutData';
import { Heading } from 'src/components/WebSite/components/Heading';
import { TitleH1 } from 'src/components/WebSite/components/TitleH1';
import { OfficeItem } from 'src/components/WebSite/components/OfficeItem';

type TSolutionsPageProps = {
  page: TPageType<TContactsPage>;
  meta: TPageType<TMetaFields>;
  bgBox: TPageType<TTitleBlock>;
  layoutData: TLayoutProps;
};

const Contacts = (props: TSolutionsPageProps) => {
  const { meta, page, bgBox, layoutData } = props;

  const { title, bgImage } = bgBox.content;

  const { page_title } = meta.content;

  const { image, offices } = page.content;

  return (
    <>
      <Layout data={layoutData}>
        <BGBox bgImage={image ? image : bgImage} display="flex" alignItems="center">
          <Heading>{title}</Heading>
        </BGBox>
        <Section>
          <Container>
            <TitleH1>{page_title}</TitleH1>
          </Container>
        </Section>
        {offices.map((item: TOffice, index: number) => (
          <OfficeItem item={item} index={index} key={item.id} />
        ))}
      </Layout>
    </>
  );
};

export default Contacts;

export async function getStaticProps() {
  // Получение всех данных страницы
  const [pageData] = (await db.execute(
    `SELECT * FROM page_contacts ORDER BY order_number ASC`
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

  const layoutData = getLayoutData(settingsData, metaContent);

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
    revalidate: 10800,
  };
}
