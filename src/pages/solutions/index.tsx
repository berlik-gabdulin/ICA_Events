import React from 'react';
import { fetchAllPageData, fetchPageBlock } from 'src/utils/api';
import {
  IData,
  TLayoutProps,
  TMetaFields,
  TPageType,
  TSolution,
  TSolutions,
  TTitleBlock,
} from 'src/utils/types';
import Layout from 'src/components/WebSite/components/Layout';
import BGBox from 'src/components/WebSite/components/BGBox';
import { Container, Section, TitleH1 } from 'src/components/globalStyles';
import { fetchLayoutData } from 'src/utils/fetchLayoutData';
import {
  ContactsBlock,
  ContentBlock,
  IconLink,
  ImageBlock,
  Intro,
  LinksBlock,
  Text,
  TextBlock,
  ThemeSection,
} from './styles';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import customTheme from 'src/theme/customTheme';
import { Heading } from 'src/components/WebSite/components/BGBox/styles';

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

  return (
    <>
      <Layout data={layoutData}>
        <BGBox bgImage={image ? image : bgImage} display="flex" alignItems="center">
          <Heading>{title}</Heading>
        </BGBox>
        <Section>
          <Container>
            <TitleH1>{page_title}</TitleH1>
            <Intro dangerouslySetInnerHTML={{ __html: intro }} />
          </Container>
        </Section>
        {solutions.map((item: TSolution) => (
          <ThemeSection key={item.id}>
            <Container>
              <ContentBlock>
                <TextBlock>
                  <h2>{item.title}</h2>
                  <Text dangerouslySetInnerHTML={{ __html: item.text }} />
                </TextBlock>
                <ImageBlock>
                  <Image src={item.image} alt={item.title} width={529} height={432} />
                </ImageBlock>
              </ContentBlock>
            </Container>
          </ThemeSection>
        ))}
        <Section style={{ backgroundColor: customTheme.dark[100] }}>
          <Container>
            <ContactsBlock>
              <div dangerouslySetInnerHTML={{ __html: contacts.text }} />

              <h2>Contacts:</h2>
              <LinksBlock>
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
  const res = await fetchAllPageData('solutions');
  const resTitle = await fetchPageBlock('home', 'title');
  const layoutData = await fetchLayoutData(res);

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
      bgBox: {
        block_title: resTitle.block_name,
        content: JSON.parse(resTitle.content),
      },
      layoutData,
    },
  };
}
