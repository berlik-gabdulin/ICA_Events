import { IAPIError, IPageBlock, IUpdateBlockData } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const revalidatePage = async (page: string) => {
  try {
    await fetch(`${API_BASE_URL}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path: `/${page !== 'home' ? page : ''}` }),
    });
  } catch (error) {
    console.error('Error during revalidation:', error);
  }
};

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
    throw new Error(data.error);
  }
  return response.json();
};

export const updatePageBlock = async (
  page: string,
  blockName: string,
  updateData: IUpdateBlockData,
  path?: string
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
  await revalidatePage(path ? path : page);
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
