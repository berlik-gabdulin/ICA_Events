import React, { useEffect, useState } from 'react';
import { fetchAllPageData, fetchPageBlock } from 'src/utils/api';
import {
  IData,
  IPageBlock,
  TEvent,
  TEvents,
  TLayoutProps,
  TMetaFields,
  TPageType,
  TTitleBlock,
} from 'src/utils/types';
import Layout from 'src/components/WebSite/components/Layout';
import BGBox from 'src/components/WebSite/components/BGBox';
import { Container, Section, TitleH1 } from 'src/components/globalStyles';
import { fetchLayoutData } from 'src/utils/fetchLayoutData';
import { Heading } from 'src/components/WebSite/components/BGBox/styles';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { formatDateRange } from 'src/utils/formatDateRange';
import { EventCard } from 'src/components/WebSite/components/EventCard';
import {
  GridBox,
  SearchBox,
  SearchInput,
  SearchLabel,
} from 'src/components/WebSite/pageStyles/stylesEvents';
import { RowDataPacket } from 'mysql2';
import db from 'src/utils/db';

type TMaterialsPageProps = {
  events: TPageType<TEvents>;
  api: any;
  combinedEvents: TEvent[];
  page: TPageType<TEvents>;
  meta: TPageType<TMetaFields>;
  bgBox: TPageType<TTitleBlock>;
  layoutData: TLayoutProps;
};

const Events = (props: TMaterialsPageProps) => {
  const { meta, api, bgBox, layoutData, combinedEvents } = props;

  const { title, bgImage } = bgBox.content;

  const { page_title } = meta.content;

  const { image } = api.content;

  const [search, setSearch] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('');
  const [eventsToShow, setEventsToShow] = useState<TEvent[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);

  useEffect(() => {
    const uniqueCountries = Array.from(new Set(combinedEvents.map((event) => event.country)));
    const uniqueIndustries = Array.from(
      new Set(combinedEvents.flatMap((event) => event.industry || []))
    );

    setCountries(uniqueCountries);
    setIndustries(uniqueIndustries);
  }, [combinedEvents]);

  // 2. Добавим функцию filterEventsArray для фильтрации событий
  const filterEventsArray = () => {
    const searchLCase = search.toLowerCase();

    const filteredEvents = combinedEvents.filter((event) => {
      const title = event.title.toLowerCase(),
        description = event.description.toLowerCase(),
        location = event.location.toLowerCase(),
        textDate = event.dateRange.toLowerCase(),
        country = event.country.toLowerCase(),
        industry = event.industry ? event.industry.toLowerCase() : '';

      return (
        (title.includes(searchLCase) ||
          description.includes(searchLCase) ||
          location.includes(searchLCase) ||
          textDate.includes(searchLCase)) &&
        country.includes(filterCountry.toLowerCase()) &&
        industry.includes(filterIndustry.toLowerCase())
      );
    });

    setEventsToShow(filteredEvents);
  };

  // 3. Используем useEffect для обновления отображаемых событий при изменении параметров фильтрации
  useEffect(() => {
    filterEventsArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterCountry, filterIndustry, combinedEvents]);

  return (
    <>
      <Layout data={layoutData}>
        <BGBox
          bgImage={image ? image : bgImage}
          style={{ minHeight: 400 }}
          display="flex"
          alignItems="center"
        >
          <Heading>{title}</Heading>
        </BGBox>
        <Section>
          <Container>
            <TitleH1>{page_title}</TitleH1>

            <SearchBox>
              <Box marginBottom={3}>
                <SearchInput
                  label="Search"
                  variant="outlined"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  fullWidth
                />
              </Box>
              <Box marginBottom={3} display="flex">
                <SearchLabel>By country</SearchLabel>
                <FormControl fullWidth>
                  <InputLabel id="country-label">Country</InputLabel>
                  <Select
                    label="Country"
                    fullWidth
                    value={filterCountry}
                    onChange={(e) => setFilterCountry(e.target.value)}
                    style={{ borderRadius: 0 }}
                    defaultValue="Choose country"
                  >
                    {countries.map((country) => (
                      <MenuItem key={country} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box marginBottom={3} display="flex">
                <SearchLabel>By industry</SearchLabel>
                <FormControl fullWidth>
                  <InputLabel id="industry-label">Industry</InputLabel>
                  <Select
                    label="Industry"
                    fullWidth
                    value={filterIndustry}
                    onChange={(e) => setFilterIndustry(e.target.value)}
                    style={{ borderRadius: 0 }}
                    defaultValue="Choose industry"
                  >
                    {industries.map((industry) => (
                      <MenuItem key={industry} value={industry}>
                        {industry}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </SearchBox>

            <GridBox>
              {eventsToShow.map((event: TEvent) =>
                !event.pastEvent ? <EventCard event={event} key={event.id} /> : null
              )}
            </GridBox>
          </Container>
        </Section>
      </Layout>
    </>
  );
};

export default Events;

export async function getStaticProps() {
  // Получение всех данных страницы
  const [pageData] = (await db.execute(
    `SELECT * FROM page_events ORDER BY order_number ASC`
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

  const layoutData = {
    social: settingsData.social?.content?.socialLinks || {},
    footer: settingsData.main?.content?.footer || '',
    navigation: settingsData.navigation?.content?.nav || [],
    meta: metaContent,
  };

  const data: IData = {};
  pageData.map((block: IPageBlock) => {
    data[`${block.block_name}`] = {
      block_title: block.block_title,
      content: JSON.parse(block.content),
    };
  });

  const allEvents = { ...data.manual.content, ...data.events.content };

  const combinedEvents = Object.entries(allEvents)
    .flatMap(([country, events]) =>
      (events as TEvent[]).map((event: any) => ({
        id: event.projectID ? event.projectID : event.id,
        title: event.project ? event.project : event.title,
        description: event.description,
        image_profile: country !== 'Azerbaijan' ? event.logomini : event.image_profile,
        beginDate: event.beginDate,
        dateRange: formatDateRange(event),
        location: event.location,
        industry: event.industry,
        website: event.programme ? event.programme : event.website,
        country: country,
        pastEvent: new Date() > new Date(event.endDate),
      }))
    )
    .sort((a: any, b: any) => new Date(a.beginDate).getTime() - new Date(b.endDate).getTime());

  return {
    props: {
      ...data,
      bgBox: {
        block_title: titleData[0].block_name,
        content: JSON.parse(titleData[0].content),
      },
      layoutData,
      combinedEvents,
    },
  };
}
