import { IData, TLayoutProps, TMetaFields } from './types';

export const getLayoutData = (settingsData: IData, metaContent: TMetaFields): TLayoutProps => ({
  social: settingsData.social?.content?.socialLinks || {},
  footer: settingsData.main?.content,
  navigation: settingsData.navigation?.content?.nav || [],
  meta: metaContent,
});
