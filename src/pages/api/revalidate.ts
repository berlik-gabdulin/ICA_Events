import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

type ErrorResponse = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Путь страницы, которую нужно обновить
    const { path } = req.body as { path: string };

    // Вызов revalidate для данного пути
    await res.revalidate(path);

    return res.json({ message: `Revalidated ${path}` });
  } catch (err) {
    // В случае ошибки
    return res.status(500).json({ message: 'Error revalidating' });
  }
}
