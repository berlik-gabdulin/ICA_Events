// utils/api.ts

import { API_BASE_URL } from 'src/config';
import { IAPIError, IPageBlock } from './types';

// Page Home
export const fetchHomePageBlock = async (blockName: string): Promise<IPageBlock> => {
  const response = await fetch(`${API_BASE_URL}/api/home/${blockName}`);
  if (!response.ok) {
    const data = (await response.json()) as IAPIError;
    throw new Error(data.error);
  }
  return response.json();
};

export const fetchAllHomePageData = async (): Promise<IPageBlock[]> => {
  const response = await fetch(`${API_BASE_URL}/api/home`);
  if (!response.ok) {
    const data = (await response.json()) as IAPIError;
    console.log('API data', data);
    throw new Error(data.error);
  }
  return response.json();
};

export const updateHomePageBlock = async (blockName: string, content: string) => {
  const response = await fetch(`${API_BASE_URL}/api/home/${blockName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    const data = (await response.json()) as IAPIError;
    throw new Error(data.error);
  }
};

// Page About
export const fetchAboutPageBlock = async (blockName: string): Promise<IPageBlock> => {
  const response = await fetch(`${API_BASE_URL}/api/about/${blockName}`);
  if (!response.ok) {
    const data = (await response.json()) as IAPIError;
    throw new Error(data.error);
  }
  return response.json();
};

export const fetchAllAboutPageBlocks = async (): Promise<IPageBlock[]> => {
  const response = await fetch(`${API_BASE_URL}/api/about`);
  if (!response.ok) {
    const data = (await response.json()) as IAPIError;
    throw new Error(data.error);
  }
  return response.json();
};

export const updateAboutPageBlock = async (blockName: string, content: string) => {
  const response = await fetch(`${API_BASE_URL}/api/about/${blockName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    const data = (await response.json()) as IAPIError;
    throw new Error(data.error);
  }
};

// Page Settings
export const fetchSettingsPageBlock = async (blockName: string): Promise<IPageBlock> => {
  const response = await fetch(`${API_BASE_URL}/api/settings/${blockName}`);
  if (!response.ok) {
    const data = (await response.json()) as IAPIError;
    throw new Error(data.error);
  }
  return response.json();
};

export const fetchAllSettingsPageData = async (): Promise<IPageBlock[]> => {
  const response = await fetch(`${API_BASE_URL}/api/settings`);
  if (!response.ok) {
    const data = (await response.json()) as IAPIError;
    throw new Error(data.error);
  }
  return response.json();
};

export const updateSettingsPageBlock = async (blockName: string, content: string) => {
  const response = await fetch(`${API_BASE_URL}/api/settings/${blockName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    const data = (await response.json()) as IAPIError;
    throw new Error(data.error);
  }
};
