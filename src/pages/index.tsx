import React from 'react';
import TitleBlock from 'src/components/WebSite/components/TitleBlock';
import AboutBlock from 'src/components/WebSite/components/AboutBlock';
import EventsBlock from 'src/components/WebSite/components/EventsBlock';
import TestimonialsBlock from 'src/components/WebSite/components/TestimonialsBlock';
import ContactBlock from 'src/components/WebSite/components/ContactBlock';
import {
  IData,
  IPageBlock,
  TAboutTab,
  TContactsBlock,
  TEvent,
  TReportProps,
  TLayoutProps,
  TMembership,
  TMetaFields,
  TPageType,
  TReportsBlockProps,
  TTestimonial,
  TTitleBlock,
} from 'src/utils/types';
import Layout from 'src/components/WebSite/components/Layout';
import CustomSVGMap from 'src/components/WebSite/components/LocationBlock';
import Membership from 'src/components/WebSite/components/Membership';
import { RowDataPacket } from 'mysql2';
import db from 'src/utils/db';
import ReportsBlock from 'src/components/WebSite/components/ReportsBlock';

type THomePageProps = {
  title: TPageType<TTitleBlock>;
  about: TPageType<TAboutTab>;
  events: TPageType<TEvent[]>;
  testimonials: TPageType<TTestimonial[]>;
  reports: TPageType<TReportsBlockProps>;
  membership: TPageType<TMembership>;
  contacts: TPageType<TContactsBlock>;
  meta: TPageType<TMetaFields>;
  layoutData: TLayoutProps;
};
const imageData: TReportProps[] = [
  {
    urls: ['https://example.com/image1a.jpg', 'https://example.com/image1b.jpg'],
    alt: 'Image 1',
    subtitle: 'Subtitle 1',
    text: 'Description 1',
  },
  {
    urls: ['https://example.com/image2a.jpg', 'https://example.com/image2b.jpg'],
    alt: 'Image 2',
    subtitle: 'Subtitle 2',
    text: 'Description 2',
  },
  {
    urls: ['https://example.com/image3a.jpg', 'https://example.com/image3b.jpg'],
    alt: 'Image 3',
    subtitle: 'Subtitle 3',
    text: 'Description 3',
  },
];

const reports = { title: 'Photo reports from our events', reports: imageData };

const Home = (props: THomePageProps) => {
  const { title, about, events, testimonials, membership, contacts, layoutData } = props;

  return (
    <>
      <Layout data={layoutData}>
        <TitleBlock {...title} />
        <AboutBlock {...about} />
        <EventsBlock {...events} />
        <CustomSVGMap />
        <ReportsBlock {...reports} />
        <TestimonialsBlock {...testimonials} />
        {/* <Membership {...membership} /> */}
        <ContactBlock {...contacts} socialLinks={layoutData.social} />
      </Layout>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  // Получение всех данных страницы
  const [pageData] = (await db.execute(
    `SELECT * FROM page_home ORDER BY order_number ASC`
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

  return {
    props: {
      ...data,
      layoutData,
    },
  };
}
