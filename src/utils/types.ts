import { ButtonHTMLAttributes, CSSProperties, ReactElement, ReactNode } from 'react';

export interface IData {
  [key: string]: {
    block_title: string;
    content: any; // или более конкретный тип
  };
}

export type TFooter = {
  footer: string;
  privacyPolicy: string;
  privacyPolicyBanner: string;
};

export interface IPageBlock {
  id: number;
  block_name: string;
  block_title: string;
  content: string;
  order: number;
}

export interface IUploadResponse {
  url: string;
}

export interface IAPIError {
  error?: string;
  message?: string;
}

export type TPageType<T> = {
  block_title: string;
  content: T;
};

export type TButton = {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  customcolor?: string | null;
  style?: any | null;
  onClick?: () => void;
  children: ReactNode;
  loading?: boolean;
  ref?: React.MutableRefObject<null>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type TMetaFields = {
  id: number;
  meta_title: string;
  page_title: string;
  meta_description: string;
  meta_keywords: string;
  og_description: string;
  og_locale: string;
  og_image: string;
};

export type TTitleBlock = {
  title: string;
  buttons: {
    [key: string]: {
      label: string;
      isActive: boolean;
    };
  };
  bgImage: string;
  bgImageMobile: string;
};

export type TTitleTab = {
  content: TTitleBlock;
};

export type TAboutTab = {
  block_title: string;
  title: string;
  text: string;
  bullets: Record<string, string>;
};

export type TLocationTab = {
  title: string;
};

export type TTestimonial = {
  id: string;
  author: string;
  testimonial: string;
};

export type TTestimonials = {
  testimonials: TTestimonial[];
};

export type TMembership = {
  label: string;
  image: string;
};

export type TContactsBlock = {
  title: string;
  social_title: string;
  contactsHtml: string;
  photo: string;
};

export type TSocialLinks = {
  [key: string]: {
    url: string;
    isActive: boolean;
  };
};

export type TNavigation = {
  name: string;
  label: string;
  path: string;
  isActive: boolean;
  order: number;
  subMenu?: TNavigation;
}[];

export type NavLinkProps = {
  isActive?: boolean;
};

export type TLayoutProps = {
  social: TSocialLinks;
  footer: TFooter;
  navigation: TNavigation;

  meta: TMetaFields;
};

export type TEvent = {
  id: string;
  title: string;
  description: string;
  image_profile: string;
  beginDate: string;
  endDate: string;
  dateRange: string;
  location: string;
  country: string;
  industry: string;
  website: string;
  pastEvent: boolean;
};

export type TEvents = {
  events: TEvent[];
};

export type TEventsBlock = {
  title: string;
  events: TEvent[];
  eventWebsiteBtn: string;
  eventPromoBtn: string;
  viewAllBtn: string;
};

export type TBGBox = {
  containerStyles?: CSSProperties;
  children: ReactElement | ReactElement[];
  bgImage: string;
};

export type TAboutPage = {
  image: string;
  text: string;
};

export type TSettingsMain = {
  footer: string;
  privacyPolicy: string;
  privacyPolicyBanner: string;
};

export interface IUpdateBlockData {
  content?: string;
  order_number?: number;
  block_title?: string;
  block_name?: string;
}

export type TSolutionButton = {
  label: string;
  link: string;
};

export type TSolution = {
  id: string;
  image: string;
  title: string;
  text: string;
};

export type TSolutions = {
  image: string;
  intro: string;
  contacts: {
    text: string;
    phone: string;
    email: string;
  };
  solutions: TSolution[];
};

export type TOffice = {
  id: string;
  image: string;
  city: string;
  text: string;
  hours: string;
  theme: 'Medium' | 'Light' | 'Dark';
  map: string;
};

export type TContactsPage = {
  image: string;
  offices: TOffice[];
};

export type TReport = {
  id: string;
  gallery_title: string;
  country: string;
  countryInLocation: string;
  preview: string;
  year: string;
  location: string;
  urls: string[];
  path: string;
  order: number;
  isNew: boolean;
};

export type TReports = {
  image: string;
  galleries: Record<string, TReport[]>;
};

export type TReportModalProps = {
  open: boolean;
  onClose: (updatedGallery?: TReport) => void;
  gallery: TReport;
};

export type TImagePreviewProps = {
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
};

export type TMaterial = {
  id: string;
  name: string;
  link: string;
  size: string;
  format: string;
  order: string;
};

export type TMaterialsPage = {
  image: string;
  materials: TMaterial[];
};

export type TUpload = {
  url: string;
  name: string;
  size: number;
  type: string;
};

export type TReportsBlockProps = {
  reports: TReport[];
  buttonText: string;
  title: string;
};
