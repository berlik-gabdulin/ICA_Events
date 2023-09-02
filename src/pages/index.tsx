import React from 'react';
import { fetchAllHomePageData } from 'src/utils/api';
import TitleBlock from 'src/components/WebSite/components/TitleBlock';
import AboutBlock from 'src/components/WebSite/components/AboutBlock';
import EventsBlock from 'src/components/WebSite/components/EventsBlock';
import TestimonialsBlock from 'src/components/WebSite/components/TestimonialsBlock';
import ContactBlock from 'src/components/WebSite/components/ContactBlock';
import {
  TAboutTab,
  TContactsBlock,
  TEvent,
  TPageType,
  TTestimonial,
  TTitleBlock,
} from 'src/utils/types';
import Layout from 'src/components/WebSite/components/Layout';

type THomePageProps = {
  title: TPageType<TTitleBlock>;
  about: TPageType<TAboutTab>;
  events: TPageType<TEvent[]>;
  testimonials: TPageType<TTestimonial[]>;
  contacts: TPageType<TContactsBlock>;
};

const Home = (props: THomePageProps) => {
  console.log('props', props);

  const { title, about, events, testimonials, contacts } = props;

  return (
    <Layout>
      <TitleBlock {...title} />
      <AboutBlock {...about} />
      <EventsBlock {...events} />
      <TestimonialsBlock {...testimonials} />
      <ContactBlock {...contacts} />
    </Layout>
  );
};

export default Home;

export async function getStaticProps() {
  const res = await fetchAllHomePageData();

  const data: any = {};
  res.map((block) => {
    data[`${block.block_name}`] = {
      block_title: block.block_title,
      content: JSON.parse(block.content),
    };
  });

  return {
    props: {
      ...data,
    },
  };
}
