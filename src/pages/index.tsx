import React from 'react';
import { fetchAllHomePageData, fetchAllSettingsPageData } from 'src/utils/api';
import TitleBlock from 'src/components/WebSite/components/TitleBlock';
import AboutBlock from 'src/components/WebSite/components/AboutBlock';
import EventsBlock from 'src/components/WebSite/components/EventsBlock';
import TestimonialsBlock from 'src/components/WebSite/components/TestimonialsBlock';
import ContactBlock from 'src/components/WebSite/components/ContactBlock';
import {
  IData,
  TAboutTab,
  TContactsBlock,
  TEvent,
  TLayoutProps,
  TMembership,
  TMetaFields,
  TNavigation,
  TPageType,
  TSocialLinks,
  TTestimonial,
  TTitleBlock,
} from 'src/utils/types';
import Layout from 'src/components/WebSite/components/Layout';
import CustomSVGMap from 'src/components/WebSite/components/LocationBlock';
import Membership from 'src/components/WebSite/components/Membership';
import { fetchLayoutData } from 'src/utils/fetchLayoutData';
import MetaHead from 'src/components/MetaHead';

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
  const { title, about, events, testimonials, membership, contacts, meta, layoutData } = props;

  return (
    <>
      <MetaHead meta={meta.content} />
      <Layout data={layoutData}>
        <TitleBlock {...title} />
        <AboutBlock {...about} />
        <EventsBlock {...events} />
        <CustomSVGMap />
        <TestimonialsBlock {...testimonials} />
        <Membership {...membership} />
        <ContactBlock {...contacts} socialLinks={layoutData.social} />
      </Layout>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const res = await fetchAllHomePageData();
  const layoutData = await fetchLayoutData();

  const data: IData = {};
  res.map((block) => {
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
