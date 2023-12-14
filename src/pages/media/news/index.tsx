import React from 'react';
import { GetStaticProps } from 'next';
import { Grid, Pagination, CardMedia, CardContent, Link, CardActions } from '@mui/material';
import Layout from 'src/components/WebSite/components/Layout'; // Импортируйте ваш Layout компонент
import { RowDataPacket } from 'mysql2';
import db from 'src/utils/db';
import { IData, IPageBlock, TLayoutProps, TPageType, TTitleBlock } from 'src/utils/types';
import { getLayoutData } from 'src/utils/getLayoutData';
import BGBox from 'src/components/WebSite/components/BGBox';
import { Container, Section } from 'src/components/globalStyles';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { NewsButton, NewsItemDate, NewsItemText, NewsItemWrapper, NewsTitleLink } from './styles';
import { Heading } from 'src/components/WebSite/components/Heading';
import { TitleH1 } from 'src/components/WebSite/components/TitleH1';

interface NewsItem {
  id: number;
  title: string;
  image_url: string;
  content: string;
  short_text?: string;
  published_at: string;
  alias: string;
}

interface NewsPageProps {
  news: NewsItem[];
  total: number;
  bgBox: TPageType<TTitleBlock>;
  layoutData: TLayoutProps;
}

const NewsPage: React.FC<NewsPageProps> = ({ news, total, bgBox, layoutData }) => {
  const [page, setPage] = React.useState(1);
  const router = useRouter();

  const handleReadMoreClick = (item: NewsItem) => {
    router.push(`/media/news/${item.alias}`);
  };

  const totalPages = Math.ceil(total / 10);

  const { bgImage, title } = bgBox.content;

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Layout data={layoutData}>
      <BGBox bgImage={bgImage} style={{ minHeight: 400 }} display="flex" alignItems="center">
        <Heading>{title}</Heading>
      </BGBox>
      <Section>
        <Container>
          <TitleH1>{layoutData.meta.meta_title}</TitleH1>
          <Grid container spacing={[30, 5]}>
            {news.map((item) => (
              <Grid item xs={12} md={6} key={item.id}>
                <NewsItemWrapper
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 0 }}
                >
                  <NewsTitleLink href={`/media/news/${item.alias}`}>
                    <h3>{item.title}</h3>
                  </NewsTitleLink>
                  <NewsItemDate>{item.published_at}</NewsItemDate>
                  <Link href={`/media/news/${item.alias}`} style={{ textDecoration: 'none' }}>
                    <CardMediaWrapper>
                      <CardMedia
                        component="img"
                        image={item.image_url || '/assets/placeholder.jpg'}
                        alt={item.title}
                      />
                    </CardMediaWrapper>
                  </Link>
                  <CardContent sx={{ paddingX: 0 }}>
                    <NewsItemText>{item.short_text}</NewsItemText>
                  </CardContent>
                  <CardActions sx={{ padding: 0 }}>
                    <NewsButton
                      size="small"
                      onClick={() => handleReadMoreClick(item)}
                      variant="outlined"
                    >
                      READ MORE
                    </NewsButton>
                  </CardActions>
                </NewsItemWrapper>
              </Grid>
            ))}
          </Grid>

          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            sx={{ mt: 3, justifyContent: 'center', display: 'flex' }}
          />
        </Container>
      </Section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const [newsRes] = await db.execute<RowDataPacket[]>(
    'SELECT * FROM collection_news ORDER BY published_at ASC'
  );

  const news = Array.isArray(newsRes) ? newsRes : Array.from(newsRes);

  const newsArray = news as NewsItem[];

  newsArray.forEach((item) => {
    if (item.published_at) {
      item.published_at = new Date(item.published_at).toLocaleDateString();
    }
  });

  const [totalResults] = (await db.execute(
    'SELECT COUNT(*) AS total FROM collection_news'
  )) as RowDataPacket[];

  const total = totalResults[0].total;

  // Получение всех данных страницы
  const [pageData] = (await db.execute(
    `SELECT * FROM page_news ORDER BY order_number ASC`
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

  return {
    props: {
      news,
      total,
      bgBox: {
        block_title: titleData[0].block_name,
        content: JSON.parse(titleData[0].content),
      },
      layoutData,
    },
    revalidate: 10800,
  };
};

export default NewsPage;

const CardMediaWrapper = styled.div`
  position: relative;
  padding-top: 56%;
  object-fit: cover;
  height: 0;
  overflow: hidden;
  img {
    position: absolute;
    top: 0;
  }
`;
