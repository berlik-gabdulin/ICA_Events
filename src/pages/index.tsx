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
  TLayoutProps,
  TMembership,
  TMetaFields,
  TPageType,
  TTestimonial,
  TTitleBlock,
} from 'src/utils/types';
import Layout from 'src/components/WebSite/components/Layout';
import CustomSVGMap from 'src/components/WebSite/components/LocationBlock';
import Membership from 'src/components/WebSite/components/Membership';
import { RowDataPacket } from 'mysql2';
import db from 'src/utils/db';

type THomePageProps = {
  title: TPageType<TTitleBlock>;
  about: TPageType<TAboutTab>;
  events: TPageType<TEvent[]>;
  testimonials: TPageType<TTestimonial[]>;
  membership: TPageType<TMembership>;
  contacts: TPageType<TContactsBlock>;
  meta: TPageType<TMetaFields>;
  layoutData: TLayoutProps;
};

const Home = (props: THomePageProps) => {
  const { title, about, events, testimonials, membership, contacts, layoutData } = props;

  return (
    <>
      <Layout data={layoutData}>
        <TitleBlock {...title} />
        <AboutBlock {...about} />
        <EventsBlock {...events} />
        <CustomSVGMap />
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
