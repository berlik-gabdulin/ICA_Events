import React from 'react';
import TitleBlock from 'src/components/WebSite/components/TitleBlock';
import AboutBlock from 'src/components/WebSite/components/AboutBlock';
import {
  IData,
  IPageBlock,
  TAboutTab,
  TContactsBlock,
  TEvent,
  TLayoutProps,
  TMembership,
  TMetaFields,
  TPageType,
  TReportsBlockProps,
  TTestimonial,
  TTitleBlock,
} from 'src/utils/types';
import Layout from 'src/components/WebSite/components/Layout';
import { RowDataPacket } from 'mysql2';
import db from 'src/utils/db';
import dynamic from 'next/dynamic';
import useResponsive from 'src/hooks/useResponsive';
import { getLayoutData } from 'src/utils/getLayoutData';

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
  allEvents: TEvent[];
};

const Home = (props: THomePageProps) => {
  const {
    title,
    about,
    events,
    testimonials,
    /*membership,*/ reports,
    contacts,
    layoutData,
    allEvents,
  } = props;

  const isMobile = useResponsive('down', 'md');

  // Динамически загружаемые компоненты
  const EventsBlock = dynamic(() => import('src/components/WebSite/components/EventsBlock'));
  const CustomSVGMap = dynamic(() => import('src/components/WebSite/components/LocationBlock'));
  const ReportsBlock = dynamic(() => import('src/components/WebSite/components/ReportsBlock'));
  // const Membership = dynamic(() => import('src/components/WebSite/components/Membership'));
  const TestimonialsBlock = dynamic(
    () => import('src/components/WebSite/components/TestimonialsBlock')
  );
  const ContactBlock = dynamic(() => import('src/components/WebSite/components/ContactBlock'));

  return (
    <>
      <Layout data={layoutData}>
        <TitleBlock {...title} events={allEvents} />
        <AboutBlock {...about} />
        <EventsBlock {...events} />
        {!isMobile ? <CustomSVGMap events={allEvents} /> : null}
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

  const [allEvents] = (await db.execute(
    `SELECT content FROM page_events WHERE block_name = 'allEvents'`
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
      allEvents: JSON.parse(allEvents[0].content),
      layoutData,
    },
  };
}
