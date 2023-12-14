import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { CardMedia, CardContent } from '@mui/material';
import Layout from 'src/components/WebSite/components/Layout';
import { RowDataPacket } from 'mysql2';
import db from 'src/utils/db';
import { IData, IPageBlock, TLayoutProps, TMetaFields } from 'src/utils/types';
import { getLayoutData } from 'src/utils/getLayoutData';
import BGBox from 'src/components/WebSite/components/BGBox';
import { Container, Section } from 'src/components/globalStyles';
import { INewsData } from 'src/components/editors/newsPage/tabs/addNewsModal';
import { formatDate } from 'src/utils/formatTime';
import { NewsItemDate, NewsItemTextFull, NewsItemWrapper, NewsTitle } from './styles';
import { Heading } from 'src/components/WebSite/components/Heading';

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
          <NewsItemWrapper>
            {image_url && (
              <CardMedia
                component="img"
                image={image_url || 'path_to_placeholder_image'}
                alt={title}
              />
            )}
            <CardContent>
              <NewsTitle>{title}</NewsTitle>
              <NewsItemDate>{published_at}</NewsItemDate>
              <NewsItemTextFull dangerouslySetInnerHTML={{ __html: content }} />
            </CardContent>
          </NewsItemWrapper>
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
  const [newsItems] = await db.execute<RowDataPacket[]>(
    'SELECT * FROM collection_news WHERE alias = ?',
    [alias]
  );

  const newsSingleItem: INewsData = {
    ...(newsItems[0] as unknown as INewsData),
    published_at: formatDate((newsItems[0] as unknown as INewsData).published_at as string),
  };

  console.log(newsSingleItem);

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

  if (!newsSingleItem || newsItems.length === 0) {
    return { notFound: true };
  }

  const metaContent: TMetaFields = {
    id: newsSingleItem.id as number,
    page_title: newsSingleItem.title,
    meta_title: newsSingleItem.title,
    meta_description: newsSingleItem.meta_description,
    meta_keywords: newsSingleItem.meta_keywords,
    og_description: newsSingleItem.og_description,
    og_locale: newsSingleItem.og_locale,
    og_image: newsSingleItem.og_image,
  };

  const layoutData = getLayoutData(settingsData, metaContent);

  return {
    props: {
      newsItem: newsSingleItem,
      layoutData,
    },
    revalidate: 10800,
  };
};
