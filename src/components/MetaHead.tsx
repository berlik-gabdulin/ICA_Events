import Head from 'next/head';
import Script from 'next/script';
import { FC } from 'react';
import { useRouter } from 'next/router';
import { TMetaFields } from 'src/utils/types';

const MetaHead: FC<{ meta: TMetaFields }> = ({ meta }) => {
  const router = useRouter();

  const canonicalUrl = `https://ica-events.com${router.pathname}`;

  return (
    <>
      <Head>
        <title>{meta.meta_title}</title>
        <meta name="description" content={meta.meta_description} />
        <meta name="keywords" content={meta.meta_keywords} />
        <meta property="og:description" content={meta.og_description} />
        <meta property="og:locale" content={meta.og_locale} />
        <meta property="og:image" content={meta.og_image} />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-TSKMGS93ND"
        strategy="lazyOnload"
      />
      <Script
        id="GTM"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-TSKMGS93ND');
        `,
        }}
        strategy="lazyOnload"
      />
    </>
  );
};

export default MetaHead;
