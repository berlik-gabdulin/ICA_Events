import { fetchAllPageData } from './api';
import { IData, IPageBlock } from './types';

export const fetchLayoutData = async (data: IPageBlock[]) => {
  const res: IPageBlock[] = await fetchAllPageData('settings');

  const metaBlock = data.find((item: IPageBlock) => item.block_name === 'meta');
  const metaContent = metaBlock ? JSON.parse(metaBlock.content) : null;

  const settingsData: IData = {};
  res.map((block) => {
    settingsData[`${block.block_name}`] = {
      block_title: block.block_title,
      content: JSON.parse(block.content),
    };
  });

  const layoutData = {
    social: settingsData.social?.content?.socialLinks || {},
    footer: settingsData.main?.content?.footer || '',
    navigation: settingsData.navigation?.content?.nav || [],
    meta: metaContent,
  };

  return layoutData;
};
