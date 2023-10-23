import React, { useEffect, useState } from 'react';
import { Box, Button, List, ListItem, Typography, Pagination } from '@mui/material';
import { useRouter } from 'next/router';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image_url: string;
  published_at: string;
}

const NewsList: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const fetchNews = async () => {
    try {
      const response = await fetch(`/api/news?page=${page}`);
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleEdit = (id: number) => {
    router.push(`/admin/news/edit/${id}`);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box>
      <List>
        {news.map((item) => (
          <ListItem key={item.id}>
            <Box flexGrow={1}>
              <Typography variant="h6">{item.title}</Typography>
            </Box>
            <Button variant="contained" color="primary" onClick={() => handleEdit(item.id)}>
              Edit
            </Button>
          </ListItem>
        ))}
      </List>
      <Pagination count={10} page={page} onChange={handlePageChange} />
    </Box>
  );
};

export default NewsList;
