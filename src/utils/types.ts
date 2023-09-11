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
  customcolor?: string;
  style?: any;
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

export type TLayoutProps = {
  social: TSocialLinks;
  footer: string;
  navigation: TNavigation;
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
  text: string;
  image: string;
};
