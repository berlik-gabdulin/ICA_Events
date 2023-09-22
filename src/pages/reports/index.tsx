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
import { ThemeSection } from './styles';
import Image from 'next/image';
import { Heading } from 'src/components/WebSite/components/BGBox/styles';
import customTheme from 'src/theme/customTheme';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import styled from '@emotion/styled';

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
          <ThemeSection key={country}>
            <Container>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <h2>{country}</h2>
                  {groupedByCountry[country].slice(0, 5).map((gallery, index) => (
                    <Card
                      key={index}
                      onClick={() => openLightbox(gallery)}
                      style={{ borderRadius: 0 }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt={gallery.gallery_title}
                          height="100%"
                          image={gallery.preview}
                          style={{ objectFit: 'cover' }}
                        />
                        <CardContent
                          style={{ position: 'absolute', backgroundColor: 'transparent' }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            {gallery.gallery_title}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ))}
                </Grid>
              </Grid>
            </Container>
          </ThemeSection>
        ))}
      </Layout>
      {lightboxOpen && currentGallery && (
        <StyledLightBox
          open={lightboxOpen}
          close={() => closeLightbox()}
          slides={currentGallery.urls.map((url) => ({ src: url }))}
        />
      )}
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
