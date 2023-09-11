import Head from 'next/head';
import { FC } from 'react';
import { TMetaFields } from 'src/utils/types';

const MetaHead: FC<{ meta: TMetaFields }> = ({ meta }) => (
  <Head>
    <title>{meta.page_title}</title>
    <meta name="description" content={meta.meta_description} />
    <meta name="keywords" content={meta.meta_keywords} />
    <meta property="og:description" content={meta.og_description} />
    <meta property="og:locale" content={meta.og_locale} />
    <meta property="og:image" content={meta.og_image} />
  </Head>
);
export default MetaHead;
