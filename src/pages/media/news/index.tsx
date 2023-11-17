import React from 'react';
import { GetStaticProps } from 'next';
import {
  Box,
  Grid,
  Typography,
  Pagination,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from '@mui/material';
import Layout from 'src/components/WebSite/components/Layout'; // Импортируйте ваш Layout компонент
import Image from 'next/image';
import { OkPacketParams, RowDataPacket } from 'mysql2';
import db from 'src/utils/db';
import { IData, IPageBlock, TLayoutProps, TPageType, TTitleBlock } from 'src/utils/types';
import { getLayoutData } from 'src/utils/getLayoutData';
import BGBox from 'src/components/WebSite/components/BGBox';
import { Heading } from 'src/components/WebSite/components/BGBox/styles';

interface NewsItem {
  id: number;
  title: string;
  image_url: string;
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
  const totalPages = Math.ceil(total / 10); // Предположим, что на странице 10 новостей

  const { title, bgImage } = bgBox.content;

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    // Здесь может быть логика для обновления URL или перехода на другую страницу
  };

  return (
    <Layout data={layoutData}>
      <BGBox bgImage={bgImage} style={{ minHeight: 400 }} display="flex" alignItems="center">
        <Heading>{title}</Heading>
      </BGBox>
      <Box sx={{ flexGrow: 1, paddingTop: 10, paddingX: 4 }}>
        <Grid container spacing={2}>
          {news.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardActionArea href={`/media/news/${item.alias}`}>
                  <CardMedia component="img" height="140" image={item.image_url} alt={item.title} />
                  {item.image_url}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.published_at}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          sx={{ mt: 3, justifyContent: 'center', display: 'flex' }}
        />
      </Box>
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
  };
};

export default NewsPage;
