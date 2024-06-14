import React from 'react';
import {
  IData,
  IPageBlock,
  TLayoutProps,
  TMaterialsPage,
  TMetaFields,
  TPageType,
  TTitleBlock,
} from 'src/utils/types';
import Layout from 'src/components/WebSite/components/Layout';
import BGBox from 'src/components/WebSite/components/BGBox';
import { Container, Path, Section } from 'src/components/globalStyles';
import { Box } from '@mui/material';
import {
  DownloadCard,
  DownloadCardInfo,
  MaterialInfo,
  MaterialTitle,
} from 'src/components/WebSite/pageStyles/stylesMaterials';
import Button from 'src/components/WebSite/components/Button';
import DownloadIcon from '@mui/icons-material/Download';
import { RowDataPacket } from 'mysql2';
import db from 'src/utils/db';
import Image from 'next/image';
import PathImg from 'public/assets/arc.png';
import { getLayoutData } from 'src/utils/getLayoutData';
import { Heading } from 'src/components/WebSite/components/Heading';
import { TitleH1 } from 'src/components/WebSite/components/TitleH1';

type TMaterialsPageProps = {
  page: TPageType<TMaterialsPage>;
  meta: TPageType<TMetaFields>;
  bgBox: TPageType<TTitleBlock>;
  layoutData: TLayoutProps;
};

const Materials = (props: TMaterialsPageProps) => {
  const { meta, page, bgBox, layoutData } = props;

  const { title, bgImage } = bgBox.content;

  const { page_title } = meta.content;

  const downloadFile = (url: string, filename: string) => {
    // Создаем скрытый элемент <a>, чтобы симулировать клик для скачивания
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    // Добавляем элемент на страницу, симулируем клик и удаляем его
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const { image, materials, downloadButton } = page.content;

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

            <Box style={{ marginTop: 50 }}>
              {materials.map((material) => (
                <DownloadCard key={material.id}>
                  <DownloadCardInfo>
                    <MaterialTitle>{material.name}</MaterialTitle>
                    <MaterialInfo>
                      {material.format.toLowerCase()} | {material.size.toLowerCase()}
                    </MaterialInfo>
                  </DownloadCardInfo>
                  <Button
                    type="button"
                    style={{ margin: 'auto 0' }}
                    variant="outlined"
                    onClick={() => downloadFile(material.link, material.name)}
                  >
                    {downloadButton}
                    <DownloadIcon />
                  </Button>
                </DownloadCard>
              ))}
            </Box>
          </Container>
          <Path>
            <Image src={PathImg} layout="fill" alt="Path" />
          </Path>
        </Section>
      </Layout>
    </>
  );
};

export default Materials;

export async function getStaticProps() {
  // Получение всех данных страницы
  const [pageData] = (await db.execute(
    `SELECT * FROM page_materials ORDER BY order_number ASC`
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
