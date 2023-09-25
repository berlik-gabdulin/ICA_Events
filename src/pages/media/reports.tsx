import React, { useState } from 'react';
import { fetchAllPageData, fetchPageBlock } from 'src/utils/api';
import {
  IData,
  TGalleries,
  TGallery,
  TLayoutProps,
  TMetaFields,
  TPageType,
  TTitleBlock,
} from 'src/utils/types';
import Layout from 'src/components/WebSite/components/Layout';
import BGBox from 'src/components/WebSite/components/BGBox';
import { Container, Section, TitleH1 } from 'src/components/globalStyles';
import { fetchLayoutData } from 'src/utils/fetchLayoutData';
import { ThemeSection } from 'src/components/WebSite/pageStyles/stylesReports';
import { Heading } from 'src/components/WebSite/components/BGBox/styles';
import { Grid } from '@mui/material';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import styled from '@emotion/styled';
import SquareComponent from 'src/components/SquareComponent';

type TSolutionsPageProps = {
  page: TPageType<TGalleries>;
  meta: TPageType<TMetaFields>;
  bgBox: TPageType<TTitleBlock>;
  layoutData: TLayoutProps;
};

const ReportsPage = (props: TSolutionsPageProps) => {
  const [currentGallery, setCurrentGallery] = useState<TGallery | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const { meta, page, bgBox, layoutData } = props;

  const { title, bgImage } = bgBox.content;

  const { page_title } = meta.content;

  const { image, galleries } = page.content;

  const openLightbox = (gallery: TGallery) => {
    setCurrentGallery(gallery);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const fillEmptyGalleries = (galleries: TGallery[]): TGallery[] => {
    const emptyGallery = {
      id: 'empty',
      gallery_title: '',
      country: '',
      preview: '',
      year: '',
      location: '',
      urls: [],
      path: '',
      isNew: true,
    };
    while (galleries.length < 5) {
      galleries.push({ ...emptyGallery, id: `empty-${galleries.length}` });
    }
    return galleries;
  };

  const groupedByCountry: { [key: string]: TGallery[] } = galleries.reduce<{
    [key: string]: TGallery[];
  }>((acc, gallery) => {
    const country = gallery.country;
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(gallery);
    return acc;
  }, {});

  console.log(groupedByCountry);

  Object.keys(groupedByCountry).forEach((country) => {
    groupedByCountry[country] = fillEmptyGalleries(groupedByCountry[country]);
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
        {Object.keys(groupedByCountry).map((country) => (
          <ThemeSection key={country} style={{ padding: '40px 0' }}>
            <Container>
              <Grid container spacing="24px">
                <Grid item xs={12} sm={6} md={4}>
                  <SquareComponent title={country} />
                </Grid>
                {groupedByCountry[country].slice(0, 5).map((gallery) => (
                  <Grid item xs={12} sm={6} md={4} key={gallery.id} className={gallery.id}>
                    <SquareComponent
                      imageSrc={gallery.preview}
                      subtitle={gallery.gallery_title}
                      text={`${gallery.location}, ${gallery.country}`}
                      onClick={() => (gallery.preview ? openLightbox(gallery) : null)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Container>
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
  const res = await fetchAllPageData('galleries');
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
