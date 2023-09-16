// utils/api.ts

import { API_BASE_URL } from 'src/config';
import { IAPIError, IPageBlock, IUpdateBlockData } from './types';

export const fetchPageBlock = async (page: string, blockName: string): Promise<IPageBlock> => {
  const response = await fetch(`${API_BASE_URL}/api/${page}/${blockName}`);
  if (!response.ok) {
    const data = (await response.json()) as IAPIError;
    throw new Error(data.error);
  }
  return response.json();
};

export const fetchAllPageData = async (page: string): Promise<IPageBlock[]> => {
  const response = await fetch(`${API_BASE_URL}/api/${page}`);

  if (!response.ok) {
    const data = (await response.json()) as IAPIError;
    console.log('API data', data);
    throw new Error(data.error);
  }
  return response.json();
};

export const updatePageBlock = async (
  page: string,
  blockName: string,
  updateData: IUpdateBlockData
) => {
  const response = await fetch(`${API_BASE_URL}/api/${page}/${blockName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });
  if (!response.ok) {
    const data = (await response.json()) as IAPIError;
    throw new Error(data.error);
  }
};
