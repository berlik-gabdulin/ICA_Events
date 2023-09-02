import { CSSProperties, ReactElement } from 'react';

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

export type TContactsBlock = {
  contactsHtml: string;
  socialLinks: {
    [key: string]: {
      url: string;
      isActive: boolean;
    };
  };
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
  styles?: CSSProperties;
  children: ReactElement | ReactElement[];
  bgImage: string;
};
