import React, { useState } from 'react';
import { fetchAllPageData, fetchPageBlock } from 'src/utils/api';
import {
  IData,
  TContactsPage,
  TLayoutProps,
  TMetaFields,
  TOffice,
  TPageType,
  TTitleBlock,
} from 'src/utils/types';
import Layout from 'src/components/WebSite/components/Layout';
import BGBox from 'src/components/WebSite/components/BGBox';
import { Container, Section, TitleH1 } from 'src/components/globalStyles';
import { fetchLayoutData } from 'src/utils/fetchLayoutData';
import { Text, TextBlock, ThemeSection } from './styles';
import Image from 'next/image';
import { Heading } from 'src/components/WebSite/components/BGBox/styles';
import customTheme from 'src/theme/customTheme';

type TSolutionsPageProps = {
  page: TPageType<TContactsPage>;
  meta: TPageType<TMetaFields>;
  bgBox: TPageType<TTitleBlock>;
  layoutData: TLayoutProps;
};

const ReportsPage = (props: TSolutionsPageProps) => {
  const extractIframeSrc = (iframeHtml: string) => {
    const doc = new DOMParser().parseFromString(iframeHtml, 'text/html');
    const iframe = doc.querySelector('iframe');
    return iframe ? iframe.getAttribute('src') : null;
  };

  const { meta, page, bgBox, layoutData } = props;

  const { title, bgImage } = bgBox.content;

  const { page_title } = meta.content;

  const { image, offices } = page.content;

  return (
    <>
      <Layout data={layoutData}>
        <BGBox bgImage={image ? image : bgImage} display="flex" alignItems="center">
          <Heading>{title}</Heading>
        </BGBox>
        <Section>
          <Container>
            <TitleH1>{page_title}</TitleH1>
          </Container>
        </Section>
        {offices.map((item: TOffice) => (
          <ThemeSection key={item.id}>
            <TextBlock className="text_block">
              <div className="text_inner_block">
                <h2>{item.city}</h2>
                <Text dangerouslySetInnerHTML={{ __html: item.text }} />

                <h3>Hours</h3>
                <Text dangerouslySetInnerHTML={{ __html: item.hours }} />
              </div>
            </TextBlock>
          </ThemeSection>
        ))}
      </Layout>
    </>
  );
};

export default ReportsPage;

export async function getStaticProps() {
  const res = await fetchAllPageData('galleries');
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
