import { ButtonHTMLAttributes, CSSProperties, ReactElement, ReactNode } from 'react';

export interface IData {
  [key: string]: {
    block_title: string;
    content: any; // или более конкретный тип
  };
}

export type TFooter = {
  content: string;
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
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type TMetaFields = {
  id: number;
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
};

export type TTitleTab = {
  content: TTitleBlock;
};

export type TAboutTab = {
  block_title: string;
  text: string;
  bullets: Record<string, string>;
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
}[];

export type NavLinkProps = {
  isActive?: boolean;
};

export type TLayoutProps = {
  social: TSocialLinks;
  footer: string;
  navigation: TNavigation;
  meta: TMetaFields;
};

export type TEvent = {
  title: string;
  description: string;
  image_profile: string;
  beginDate: string;
  endDate: string;
  location: string;
  website: string;
};

export type TEvents = {
  events: TEvent[];
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
