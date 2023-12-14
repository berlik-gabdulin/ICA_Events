import React from 'react';
import {
  IData,
  IPageBlock,
  TLayoutProps,
  TMetaFields,
  TPageType,
  TSolution,
  TSolutions,
  TTitleBlock,
} from 'src/utils/types';
import Layout from 'src/components/WebSite/components/Layout';
import BGBox from 'src/components/WebSite/components/BGBox';
import { Container, Section } from 'src/components/globalStyles';
import {
  ContactsBlock,
  IconLink,
  Intro,
  LinksBlock,
} from 'src/components/WebSite/pageStyles/stylesSolutions';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import customTheme from 'src/theme/customTheme';
import { RowDataPacket } from 'mysql2';
import db from 'src/utils/db';
import { getLayoutData } from 'src/utils/getLayoutData';
import { Heading } from 'src/components/WebSite/components/Heading';
import { TitleH1 } from 'src/components/WebSite/components/TitleH1';
import { SolutionItem } from 'src/components/WebSite/components/SolutionItem';
import { useScrollAnimation } from 'src/utils/useScrollAnimation';

type TSolutionsPageProps = {
  page: TPageType<TSolutions>;
  meta: TPageType<TMetaFields>;
  bgBox: TPageType<TTitleBlock>;
  layoutData: TLayoutProps;
};

const Solutions = (props: TSolutionsPageProps) => {
  const { meta, page, bgBox, layoutData } = props;

  const { title, bgImage } = bgBox.content;

  const { page_title } = meta.content;

  const { intro, solutions, image, contacts } = page.content;

  const introRef = useScrollAnimation('animate__fadeInUp', 200, 500);
  const outroRef = useScrollAnimation('animate__fadeInUp', 200, 500);
  const contactsRef = useScrollAnimation('animate__fadeInLeft');
  const contactsContentRef = useScrollAnimation('animate__fadeInRight');

  return (
    <>
      <Layout data={layoutData}>
        <BGBox bgImage={image ? image : bgImage} display="flex" alignItems="center">
          <Heading>{title}</Heading>
        </BGBox>
        <Section>
          <Container>
            <TitleH1>{page_title}</TitleH1>
            <Intro dangerouslySetInnerHTML={{ __html: intro }} ref={introRef} />
          </Container>
        </Section>
        {solutions.map((item: TSolution, index) => (
          <SolutionItem item={item} index={index} key={item.id} />
        ))}
        <Section style={{ backgroundColor: customTheme.dark[100] }}>
          <Container>
            <ContactsBlock>
              <div dangerouslySetInnerHTML={{ __html: contacts.text }} ref={outroRef} />

              <h2 ref={contactsRef}>Contacts:</h2>
              <LinksBlock ref={contactsContentRef}>
                <Link href={`tel:${contacts.phone}`}>
                  <IconLink>
                    <FontAwesomeIcon icon={faPhone} height={40} />
                    {contacts.phone}
                  </IconLink>
                </Link>
                <Link href={`mailto:${contacts.email}`}>
                  <IconLink>
                    <FontAwesomeIcon icon={faEnvelope} height={40} />
                    {contacts.email}
                  </IconLink>
                </Link>
              </LinksBlock>
            </ContactsBlock>
          </Container>
        </Section>
      </Layout>
    </>
  );
};

export default Solutions;

export async function getStaticProps() {
  // Получение всех данных страницы
  const [pageData] = (await db.execute(
    `SELECT * FROM page_solutions ORDER BY order_number ASC`
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
      page: data.page,
      meta: data.meta,
      bgBox: {
        block_title: titleData[0].block_name,
        content: JSON.parse(titleData[0].content),
      },
      layoutData,
    },
    revalidate: 10800,
  };
}
