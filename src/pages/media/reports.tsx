import React, { useState } from 'react';
import {
  IData,
  IPageBlock,
  TReports,
  TReport,
  TLayoutProps,
  TMetaFields,
  TPageType,
  TTitleBlock,
} from 'src/utils/types';
import Layout from 'src/components/WebSite/components/Layout';
import BGBox from 'src/components/WebSite/components/BGBox';
import { Container, Path, Section } from 'src/components/globalStyles';
import { ThemeSection } from 'src/components/WebSite/pageStyles/stylesReports';
import { Grid } from '@mui/material';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import styled from '@emotion/styled';
import SquareComponent from 'src/components/SquareComponent';
import db from 'src/utils/db';
import { RowDataPacket } from 'mysql2';
import Image from 'next/image';
import PathImg from 'public/assets/arc.png';
import { getLayoutData } from 'src/utils/getLayoutData';
import { Heading } from 'src/components/WebSite/components/Heading';
import { TitleH1 } from 'src/components/WebSite/components/TitleH1';

type TSolutionsPageProps = {
  page: TPageType<TReports>;
  meta: TPageType<TMetaFields>;
  bgBox: TPageType<TTitleBlock>;
  layoutData: TLayoutProps;
};

const ReportsPage = (props: TSolutionsPageProps) => {
  const [currentGallery, setCurrentGallery] = useState<TReport | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const { meta, page, bgBox, layoutData } = props;

  const { title, bgImage } = bgBox.content;

  const { page_title } = meta.content;

  const { image, galleries } = page.content;

  const openLightbox = (gallery: TReport) => {
    setCurrentGallery(gallery);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const fillEmptyGalleries = (galleries: TReport[]): TReport[] => {
    const emptyGallery = {
      id: 'empty',
      gallery_title: '',
      country: '',
      countryInLocation: '',
      preview: '',
      year: '',
      location: '',
      urls: [],
      path: '',
      order: 999,
      isNew: true,
    };
    while (galleries.length < 5) {
      galleries.push({ ...emptyGallery, id: `empty-${galleries.length}` });
    }
    return galleries;
  };

  Object.keys(galleries).forEach((country) => {
    galleries[country] = fillEmptyGalleries(galleries[country]);
  });

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
        {Object.keys(galleries).map((country, index) => (
          <ThemeSection key={country} style={{ padding: '40px 0' }}>
            <Container>
              <Grid container spacing="24px">
                <Grid item xs={12} sm={6} md={4}>
                  <SquareComponent title={country} />
                </Grid>
                {galleries[country].slice(0, 5).map((gallery) => (
                  <Grid item xs={12} sm={6} md={4} key={gallery.id} className={gallery.id}>
                    <SquareComponent
                      imageSrc={gallery.preview}
                      subtitle={gallery.gallery_title}
                      text={`${gallery.location}, ${
                        gallery.countryInLocation ? gallery.countryInLocation : gallery.country
                      }`}
                      onClick={() => (gallery.preview ? openLightbox(gallery) : null)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Container>
            {Object.keys(galleries).length === index + 1 ? (
              <Path>
                <Image src={PathImg} layout="fill" alt="Path" />
              </Path>
            ) : null}
          </ThemeSection>
        ))}
        {lightboxOpen && currentGallery && (
          <StyledLightBox
            open={lightboxOpen}
            close={() => closeLightbox()}
            slides={currentGallery.urls.map((url) => ({ src: url }))}
          />
        )}
      </Layout>
    </>
  );
};

export default ReportsPage;

const StyledLightBox = styled(Lightbox)`
  z-index: 10000;
`;

export async function getStaticProps() {
  // Получение всех данных страницы
  const [pageData] = (await db.execute(
    `SELECT * FROM page_galleries ORDER BY order_number ASC`
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
