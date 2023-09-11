import { fetchAllSettingsPageData } from './api';
import { IData, IPageBlock } from './types';

export const fetchLayoutData = async () => {
  const res: IPageBlock[] = await fetchAllSettingsPageData();

  const settingsData: IData = {};
  res.map((block) => {
    settingsData[`${block.block_name}`] = {
      block_title: block.block_title,
      content: JSON.parse(block.content),
    };
  });

  const layoutData = {
    social: settingsData.social.content.socialLinks,
    footer: settingsData.main.content.footer,
    navigation: settingsData.navigation.content.nav,
  };

  return layoutData;
};
