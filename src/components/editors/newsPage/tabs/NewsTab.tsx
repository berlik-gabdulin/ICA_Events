import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import Input from 'src/components/Input';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddNewsModal from './addNewsModal';
import styled from '@emotion/styled';
import shadows from 'src/theme/shadows';
import { AccordionCustom, DeviderStyled } from 'src/components/globalStyles';
import { SubmitHandler, useForm } from 'react-hook-form';
import FileUploader from 'src/components/upload/FileUploader';
import ImagePreview from 'src/components/ImagePreview';
import { INewsData, NewsResponse, TNewsPage } from 'src/utils/types';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';

const boolToTiny1 = (bool: boolean) => (bool ? 1 : 0);

const NewsTab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { showError, showSuccess } = useSnackbar();
  const [news, setNews] = useState<INewsData[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsItemId, setNewsItemId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      readMore: '',
      image: '',
    },
  });

  const fetchNews = useCallback(async () => {
    try {
      const response = await fetch(`/api/news?page=${page}`);
      const data: NewsResponse = await response.json();

      setNews(data.news);
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }, [page]);

  useEffect(() => {
    fetchNews();
  }, [page, fetchNews]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPageBlock('news', 'page');
      const parsedData = JSON.parse(data.content);
      setValue('readMore', parsedData.readMore);
      setValue('image', parsedData.image);
      setLoading(false);
    };

    fetchData();
  }, [setValue]);

  const totalPages = total ? Math.ceil(total / 10) : 0;

  const handleCreateNews = async (newsData: INewsData) => {
    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newsData.title,
          alias: newsData.alias,
          content: newsData.content,
          short_text: newsData.short_text,
          imageUrl: newsData.image_url,
          meta_title: newsData.meta_title,
          meta_description: newsData.meta_description,
          meta_keywords: newsData.meta_keywords,
          og_description: newsData.og_description,
          og_locale: newsData.og_locale,
          og_image: newsData.og_image,
          isPublic: boolToTiny1(newsData.isPublic),
        }),
      });

      if (response.ok) {
        console.log('Successfull');
        fetchNews();
      } else {
        console.error('Failed to save the news');
      }
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };

  const handleUpdateNews = async (newsData: INewsData) => {
    try {
      const response = await fetch(`/api/news`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: newsItemId,
          title: newsData.title,
          alias: newsData.alias,
          content: newsData.content,
          short_text: newsData.short_text,
          imageUrl: newsData.image_url,
          meta_title: newsData.meta_title,
          meta_description: newsData.meta_description,
          meta_keywords: newsData.meta_keywords,
          og_description: newsData.og_description,
          og_locale: newsData.og_locale,
          og_image: newsData.og_image,
          isPublic: boolToTiny1(newsData.isPublic),
        }),
      });

      if (response.ok) {
        console.log('Successfull');
        fetchNews();
      } else {
        console.error('Failed to save the news');
      }
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };

  const handleEdit = (id: number) => {
    setNewsItemId(id);
    setIsModalOpen(true);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewsItemId(null);
  };

  const handleDeleteDialogOpen = (id: number, alias: string) => {
    setNewsItemId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setNewsItemId(null);
  };

  const handleDeleteNews = async () => {
    try {
      const response = await fetch(`/api/news/?id=${newsItemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchNews();
      } else {
        console.error('Failed to delete the news');
      }
    } catch (error) {
      console.error('Error deleting news:', error);
    } finally {
      handleDeleteDialogClose();
    }
  };

  const handleSaveSettings: SubmitHandler<TNewsPage> = async (formData) => {
    setLoading(true);
    try {
      await updatePageBlock('news', 'page', { content: JSON.stringify(formData) }, 'media/news');
      showSuccess('Successfully saved!');
    } catch (error) {
      showError('An error occurred');
    }
    setLoading(false);
  };

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      if (
        (e.target as HTMLElement).closest(
          '.tox-tinymce-aux, .moxman-window, .tam-assetmanager-root'
        ) !== null
      ) {
        e.stopImmediatePropagation();
      }
    };

    document.addEventListener('focusin', handleFocusIn);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, []);

  return (
    <>
      <Box display="flex" justifyContent="space-between" marginBottom={5}>
        <AccordionCustom>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Page settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={handleSubmit(handleSaveSettings)}>
              <Input
                label="Read more"
                fullWidth
                {...register('readMore', { required: 'This field is required' })}
              />
              <DeviderStyled />
              <FileUploader
                inputName="image"
                setValue={setValue}
                folder="news"
                prefix="header-background"
              />
              <Input
                label="Image"
                shrink={watch('image')}
                fullWidth
                {...register('image', { required: 'This field is required' })}
              />
              <ImagePreview src={watch('image')} alt="Header Background" height={200} />
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                Save
              </Button>
            </form>
          </AccordionDetails>
        </AccordionCustom>
      </Box>

      <DeviderStyled />

      <Box>
        <Box display="flex" justifyContent="space-between" marginBottom={5}>
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Add New News
          </Button>
          <Pagination count={totalPages} page={page} onChange={handlePageChange} />
        </Box>
        <List>
          {news?.length
            ? news.map((item) => (
                <ListItemStyled key={item.id}>
                  <Box flexGrow={1}>
                    <Typography variant="h6">{item.title}</Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => (item.id ? handleEdit(item.id) : null)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteDialogOpen(item.id ? item.id : 0, item.alias)}
                    style={{ marginLeft: 15 }}
                  >
                    Delete
                  </Button>
                </ListItemStyled>
              ))
            : null}
        </List>
      </Box>

      <AddNewsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={newsItemId === null ? handleCreateNews : handleUpdateNews}
        id={newsItemId}
      />
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete News</DialogTitle>
        <DialogContent>Are you sure you want to delete this news?</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteNews} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewsTab;

const ListItemStyled = styled(ListItem)`
  padding: 16px;
  margin-bottom: 8px;
  border: 1px solid transparent;
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  transition: all 0.15s ease-in-out;
  &:hover {
    border-radius: 8px;
    box-shadow: ${shadows.light[15]};
    border: 1px solid #efefef;
  }
`;
