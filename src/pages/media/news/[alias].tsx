import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Typography, Card, CardMedia, CardContent } from '@mui/material';
import Layout from 'src/components/WebSite/components/Layout';
import { RowDataPacket } from 'mysql2';
import db from 'src/utils/db';
import { IData, IPageBlock, TLayoutProps, TPageType, TTitleBlock } from 'src/utils/types';
import { getLayoutData } from 'src/utils/getLayoutData';
import BGBox from 'src/components/WebSite/components/BGBox';
import { Heading } from 'src/components/WebSite/components/BGBox/styles';
import { Container, Section } from 'src/components/globalStyles';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image_url: string;
  published_at: string;
}

interface NewsItemPageProps {
  newsItem: NewsItem;
  layoutData: TLayoutProps;
}

const NewsItemPage: React.FC<NewsItemPageProps> = ({ newsItem, layoutData }) => {
  const { title, content, image_url, published_at } = newsItem;

  return (
    <Layout data={layoutData}>
      <BGBox style={{ minHeight: 400 }} display="flex" alignItems="center" bgImage="">
        <Heading>{title}</Heading>
      </BGBox>
      <Section>
        <Container>
          <Card>
            <CardMedia
              component="img"
              image={image_url || 'path_to_placeholder_image'}
              alt={title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {published_at}
              </Typography>
              <Typography variant="body1" component="div">
                {content}
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Section>
    </Layout>
  );
};

export default NewsItemPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const [newsItems] = await db.execute<RowDataPacket[]>('SELECT alias FROM collection_news');

  const paths = newsItems.map((item) => ({
    params: { alias: item.alias },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const alias = params?.alias;
  const [newsItem] = await db.execute<RowDataPacket[]>(
    'SELECT * FROM collection_news WHERE alias = ?',
    [alias]
  );

  if (!newsItem || newsItem.length === 0) {
    return { notFound: true };
  }

  // Здесь добавьте код для получения layoutData и других необходимых данных

  return {
    props: {
      newsItem: newsItem[0],
      // layoutData, // Передайте layoutData, полученное выше
    },
    revalidate: 10800,
  };
};
