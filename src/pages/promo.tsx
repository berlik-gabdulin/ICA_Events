import React, { useEffect } from 'react';
import Layout from 'src/components/WebSite/components/Layout';
import { Container, Section } from 'src/components/globalStyles';
import { TitleH1 } from 'src/components/WebSite/components/TitleH1';
import { IData, IPageBlock, TLayoutProps, TMetaFields } from 'src/utils/types';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Button from 'src/components/WebSite/components/Button';
import { countriesDropdown, industries } from 'src/utils/network';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/rootReducer';
import { submitForm, setStatus } from 'src/redux/slices/contactModalSlice';
import { useRouter } from 'next/router';
import { RowDataPacket } from 'mysql2';
import db from 'src/utils/db';
import { getLayoutData } from 'src/utils/getLayoutData';

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

  useEffect(() => {
    if (selectedIndustry) {
      setValue('industry', selectedIndustry); // Устанавливаем значение выбранной индустрии в форму
    }
  }, [selectedIndustry, setValue]);

  const isSendedTimeout = () =>
    setTimeout(() => {
      dispatch(setStatus('idle'));
    }, 3000);

  const onSubmit = async (data: IFormInput) => {
    await dispatch(submitForm(new URLSearchParams(Object.entries(data))));
    dispatch(setStatus('succeeded'));
    isSendedTimeout();

    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, requestSubmitted: 'true' },
      },
      undefined,
      { shallow: true }
    );
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
                <Button type="submit" size="large" variant="contained">
                  Send the request
                </Button>
              </Box>
            </form>
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

  console.log(settings);

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
      data: settingsData.promoPage,
    },
    revalidate: 10800,
  };
}
