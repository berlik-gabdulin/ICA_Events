import React from 'react';
import { fetchAllPageData, fetchPageBlock } from 'src/utils/api';
import {
  IData,
  TLayoutProps,
  TMaterialsPage,
  TMetaFields,
  TPageType,
  TTitleBlock,
} from 'src/utils/types';
import Layout from 'src/components/WebSite/components/Layout';
import BGBox from 'src/components/WebSite/components/BGBox';
import { Container, Section, TitleH1 } from 'src/components/globalStyles';
import { fetchLayoutData } from 'src/utils/fetchLayoutData';
import { Heading } from 'src/components/WebSite/components/BGBox/styles';
import { Box } from '@mui/material';
import {
  DownloadCard,
  DownloadCardInfo,
  MaterialInfo,
  MaterialTitle,
} from 'src/components/WebSite/pageStyles/stylesMaterials';
import Button from 'src/components/WebSite/components/Button';
import DownloadIcon from '@mui/icons-material/Download';

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

  const { image, materials } = page.content;

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
                    Download
                    <DownloadIcon />
                  </Button>
                </DownloadCard>
              ))}
            </Box>
          </Container>
        </Section>
      </Layout>
    </>
  );
};

export default Materials;

export async function getStaticProps() {
  const res = await fetchAllPageData('materials');
  const resTitle = await fetchPageBlock('home', 'title');
  const layoutData = await fetchLayoutData(res);

  console.log(res);

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
