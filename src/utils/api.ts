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

export const uploadFiles = async (folder: string, formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/upload?folder=${folder}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const data = (await response.json()) as IAPIError;
    throw new Error(data.error);
  }

  return response.json();
};

export const removeFS = async ({ fileUrl, folder }: { fileUrl?: string; folder?: string }) => {
  try {
    const params = new URLSearchParams();
    if (folder) params.append('folder', folder);
    if (fileUrl) params.append('fileUrl', fileUrl);

    await fetch(`/api/delete?${params.toString()}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};
