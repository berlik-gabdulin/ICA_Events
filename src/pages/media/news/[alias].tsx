import { ReactElement } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { CardMedia, CardContent } from '@mui/material';
import Layout from 'src/components/WebSite/components/Layout';
import { RowDataPacket } from 'mysql2';
import db from 'src/utils/db';
import {
  IData,
  INewsData,
  IPageBlock,
  TLayoutProps,
  TMetaFields,
  TPageType,
  TTitleBlock,
} from 'src/utils/types';
import { getLayoutData } from 'src/utils/getLayoutData';
import BGBox from 'src/components/WebSite/components/BGBox';
import { Container, Section } from 'src/components/globalStyles';
import { formatDate } from 'src/utils/formatTime';
import {
  NewsItemDate,
  NewsItemTextFull,
  NewsItemWrapper,
  NewsTitle,
} from 'src/components/WebSite/pageStyles/stylesNews';
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
  bgBox: TPageType<TTitleBlock>;
}

const NewsItemPage: React.FC<NewsItemPageProps> = ({
  newsItem,
  layoutData,
  bgBox,
}): ReactElement => {
  const { title, content, image_url, published_at } = newsItem;

  const { bgImage, title: headingTitle } = bgBox.content;

  return (
    <Layout data={layoutData}>
      <BGBox bgImage={bgImage} style={{ minHeight: 400 }} display="flex" alignItems="center">
        <Heading>{headingTitle}</Heading>
      </BGBox>
      <Section>
        <Container>
          <NewsItemWrapper>
            <NewsTitle>{title}</NewsTitle>
            <NewsItemDate>{published_at}</NewsItemDate>
            {image_url && (
              <CardMedia
                component="img"
                image={image_url || 'path_to_placeholder_image'}
                alt={title}
              />
            )}
            <CardContent>
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

  // Получение данных для заголовка
  const [titleData] = (await db.execute(
    `SELECT * FROM page_home WHERE block_name = 'title'`
  )) as RowDataPacket[];

  const newsSingleItem: INewsData = {
    ...(newsItems[0] as unknown as INewsData),
    published_at: formatDate((newsItems[0] as unknown as INewsData).published_at as string),
  };

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
      bgBox: {
        block_title: titleData[0].block_name,
        content: JSON.parse(titleData[0].content),
      },
    },
    revalidate: 10800,
  };
};
