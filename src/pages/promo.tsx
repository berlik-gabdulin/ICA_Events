import React, { useEffect, useState } from 'react';
import Layout from 'src/components/WebSite/components/Layout';
import { Container, Section } from 'src/components/globalStyles';
import { TitleH1 } from 'src/components/WebSite/components/TitleH1';
import { IData, IPageBlock, TLayoutProps, TMetaFields } from 'src/utils/types';
import {
  Box,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Button from 'src/components/WebSite/components/Button';
import { industries } from 'src/utils/network';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/rootReducer';
import { useRouter } from 'next/router';
import { RowDataPacket } from 'mysql2';
import db from 'src/utils/db';
import { getLayoutData } from 'src/utils/getLayoutData';
import { DialogStyled } from 'src/components/WebSite/components/Footer/style';
import { handleFormSubmit } from 'src/utils/formUtils';

type TPromoPageProps = {
  layoutData: TLayoutProps;
  data: IData & { content: { page_title: string } };
  meta: TMetaFields;
};

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  message: string;
  industry: string;
  country: string;
}

const PromoPage = (props: TPromoPageProps) => {
  const {
    layoutData,
    data: {
      content: { page_title },
    },
  } = props;

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { control, handleSubmit, setValue } = useForm<IFormInput>();
  const selectedIndustry = useSelector((state: RootState) => state.contactModal.selectedIndustry); // Получаем выбранную индустрию из состояния
  const status = useSelector((state: RootState) => state.contactModal.status);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (selectedIndustry) {
      setValue('industry', selectedIndustry); // Устанавливаем значение выбранной индустрии в форму
    }
  }, [selectedIndustry, setValue]);

  const onSubmit = (data: IFormInput) => {
    setIsModalOpen(true);
    handleFormSubmit(data, dispatch, router);
  };

  const modalTitle = (): string => {
    let title = '';

    switch (status) {
      case 'loading':
        title = 'Sending Your Request...';
        break;
      case 'succeeded':
        title = 'Thank you! Your request Sent Successfully!';
        break;
      case 'failed':
        title = 'Failed to Send Request. Please try later...';
        break;
      default:
        title = 'Thank you! Your request Sent Successfully!';
    }
    return title;
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Layout data={layoutData}>
        <Section>
          <Container style={{ maxWidth: 800 }}>
            <TitleH1>{page_title}</TitleH1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth margin="normal">
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField {...field} label="Name" fullWidth margin="normal" required />
                  )}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField {...field} label="E-Mail" fullWidth margin="normal" required />
                  )}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField {...field} label="Phone" fullWidth margin="normal" required />
                  )}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <Controller
                  name="message"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField {...field} label="Message" fullWidth margin="normal" />
                  )}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="industry-label">Industry</InputLabel>
                <Controller
                  name="industry"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select {...field} label="Industry">
                      {industries.map((industry: string) => (
                        <MenuItem key={industry} value={industry}>
                          {industry.replace(/_/g, ' ').replace(/,/g, ', ').replace(/\s+/g, ' ')}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <Box marginTop={4} display="flex" justifyContent="center">
                <Button type="submit" size="small" variant="contained">
                  Send the request
                </Button>
              </Box>
            </form>

            <DialogStyled
              open={isModalOpen}
              onClose={onClose}
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              <DialogTitle style={{ padding: 0, textAlign: 'center' }}>{modalTitle()}</DialogTitle>
            </DialogStyled>
          </Container>
        </Section>
      </Layout>
    </>
  );
};

export default PromoPage;

export async function getStaticProps() {
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

  const metaContent = {
    id: 0,
    meta_title: '',
    page_title: '',
    meta_description: '',
    meta_keywords: '',
    og_description: '',
    og_locale: '',
    og_image: '',
  };

  const layoutData = getLayoutData(settingsData, metaContent);

  return {
    props: {
      layoutData,
      data: settingsData.promo,
    },
    revalidate: 10800,
  };
}
