import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await getNews(req, res);
      break;
    case 'POST':
      await addNews(req, res);
      break;
    case 'PUT':
      await updateNews(req, res);
      break;
    case 'DELETE':
      await deleteNews(req, res);
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}

// Получение новостей с постраничным выводом
async function getNews(req: NextApiRequest, res: NextApiResponse) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const [news] = await db.execute(
      'SELECT * FROM page_news ORDER BY published_at DESC LIMIT ?,?',
      [offset, limit]
    );

    res.status(200).json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Добавление новости
async function addNews(req: NextApiRequest, res: NextApiResponse) {
  const { title, content, imageUrl } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    await db.execute('INSERT INTO page_news (title, content, image_url) VALUES (?, ?, ?)', [
      title,
      content,
      imageUrl,
    ]);

    res.status(201).json({ message: 'News added successfully' });
  } catch (error) {
    console.error('Error adding news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Обновление новости
async function updateNews(req: NextApiRequest, res: NextApiResponse) {
  const { id, title, content, imageUrl } = req.body;

  if (!id || !title || !content) {
    return res.status(400).json({ error: 'ID, title, and content are required' });
  }

  try {
    await db.execute('UPDATE page_news SET title=?, content=?, image_url=? WHERE id=?', [
      title,
      content,
      imageUrl,
      id,
    ]);

    res.status(200).json({ message: 'News updated successfully' });
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Удаление новости
async function deleteNews(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  try {
    await db.execute('DELETE FROM page_news WHERE id=?', [id]);

    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
