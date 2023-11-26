import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
import { Container, Path, Section, TitleH1 } from 'src/components/globalStyles';
import { Heading } from 'src/components/WebSite/components/BGBox/styles';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { EventCard } from 'src/components/WebSite/components/EventCard';
import {
  GridBox,
  SearchBox,
  SearchInput,
  SearchLabel,
} from 'src/components/WebSite/pageStyles/stylesEvents';
import { RowDataPacket } from 'mysql2';
import db from 'src/utils/db';
import Image from 'next/image';
import PathImg from 'public/assets/arc.png';
import { countriesDropdown, industries } from 'src/utils/network';
import { getLayoutData } from 'src/utils/getLayoutData';
import dateFormatter from 'src/utils/dateFormatter';

type TMaterialsPageProps = {
  events: TPageType<TEvents>;
  api: any;
  allEvents: TEvent[];
  page: TPageType<TEvents>;
  meta: TPageType<TMetaFields>;
  bgBox: TPageType<TTitleBlock>;
  layoutData: TLayoutProps;
};

const Events = (props: TMaterialsPageProps) => {
  const { meta, api, bgBox, layoutData, allEvents } = props;

  const { title, bgImage } = bgBox.content;

  const { page_title } = meta.content;

  const { image } = api.content;

  const router = useRouter();
  const requestSubmitted = router.query.requestSubmitted;

  const [visibleEvents, setVisibleEvents] = useState<number>(6);
  const [search, setSearch] = useState<string>('');
  const [filterCountry, setFilterCountry] = useState<string>('');
  const [filterIndustry, setFilterIndustry] = useState<string>('');
  const [eventsToShow, setEventsToShow] = useState<TEvent[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false); // Добавим состояние для отслеживания инициализации
  const [promo, setPromo] = useState<string>('');

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.5 &&
          visibleEvents < eventsToShow.length
        ) {
          setVisibleEvents((prev) => Math.min(prev + 6, eventsToShow.length)); // увеличиваем количество видимых событий
        }
      });
    }, options);

    const target = document.getElementById('loadMore');
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [visibleEvents, eventsToShow.length]);

  // 2. Добавим функцию filterEventsArray для фильтрации событий
  const filterEventsArray = () => {
    setEventsToShow([]);
    const searchLCase = search.toLowerCase();

    const filteredEvents = allEvents.filter((event) => {
      if (new Date() < new Date(dateFormatter(event.endDate))) {
        const title = event.title.toLowerCase(),
          description = event.description.toLowerCase(),
          location = event.location.toLowerCase(),
          textDate = event.dateRange,
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
      } else null;
    });

    setEventsToShow(filteredEvents);
  };

  useEffect(() => {
    if (!initialized && router.isReady) {
      const { country, industry, search, promo } = router.query;
      if (country) setFilterCountry(Array.isArray(country) ? country[0] : country);
      if (industry) setFilterIndustry(Array.isArray(industry) ? industry[0] : industry);
      if (search) setSearch(Array.isArray(search) ? search[0] : search);
      if (promo) setPromo(Array.isArray(promo) ? promo[0] : promo); // Инициализируем состояние promo из URL
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    if (initialized) {
      // Убедимся, что состояние инициализировано
      filterEventsArray();
    }
    // Добавляем зависимость от initialized
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCountry, filterIndustry, search, initialized]);

  useEffect(() => {
    if (initialized) {
      const updateURL = () => {
        const newParams = new URLSearchParams();

        if (search) {
          newParams.append('search', search);
        }

        if (filterCountry) {
          newParams.append('country', filterCountry);
        }

        if (filterIndustry) {
          newParams.append('industry', filterIndustry);
        }

        if (promo) {
          newParams.append('promo', promo); // Добавляем promo в URL
        }

        if (requestSubmitted) {
          newParams.append('requestSubmitted', requestSubmitted as string);
        }

        const newSearchString = newParams.toString().replace(/\+/g, '%20');

        if (window.location.search.substr(1) !== newSearchString) {
          router.push(
            {
              pathname: router.pathname,
              search: newSearchString,
            },
            undefined,
            { shallow: true }
          );
        }
      };

      updateURL();
    }
  }, [search, filterCountry, filterIndustry, promo, router, requestSubmitted, initialized]);

  return (
    <>
      <Layout data={layoutData}>
        {!promo ? (
          <BGBox
            bgImage={image ? image : bgImage}
            style={{ minHeight: 400 }}
            display="flex"
            alignItems="center"
          >
            <Heading>{title}</Heading>
          </BGBox>
        ) : null}
        <Section>
          <Container>
            <TitleH1>{page_title}</TitleH1>
            {!promo ? (
              <SearchBox>
                <Box marginBottom={3}>
                  <SearchInput
                    label="Search"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    fullWidth
                    color="primary"
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
                      color="primary"
                    >
                      <MenuItem value="">All countries</MenuItem>
                      {countriesDropdown.map((country) => (
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
                      color="primary"
                    >
                      <MenuItem value="">All industries</MenuItem>
                      {industries.map((industry) => (
                        <MenuItem key={industry} value={industry}>
                          {industry.replace(/_/g, ' ').replace(/,/g, ', ').replace(/\s+/g, ' ')}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </SearchBox>
            ) : null}

            {eventsToShow.length ? (
              <GridBox>
                {eventsToShow.slice(0, visibleEvents).map((event: TEvent) => (
                  <EventCard event={event} key={event.id} isPromo={!!promo} />
                ))}
              </GridBox>
            ) : (
              <Typography variant="h5" textAlign="center">
                There are no events for the selected request
              </Typography>
            )}

            {visibleEvents < eventsToShow.length && (
              <Typography
                variant="h5"
                textAlign="center"
                id="loadMore"
                style={{ height: '20px', margin: '0 auto' }}
              >
                Loading...
              </Typography>
            )}
          </Container>
          <Path>
            <Image src={PathImg} layout="fill" alt="Path" />
          </Path>
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

  const layoutData = getLayoutData(settingsData, metaContent);

  const data: IData = {};
  pageData.map((block: IPageBlock) => {
    data[`${block.block_name}`] = {
      block_title: block.block_title,
      content: JSON.parse(block.content),
    };
  });

  return {
    props: {
      ...data,
      bgBox: {
        block_title: titleData[0].block_name,
        content: JSON.parse(titleData[0].content),
      },
      layoutData,
      allEvents: data.allEvents.content,
    },
    revalidate: 10800,
  };
}
