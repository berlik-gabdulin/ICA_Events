import { RowDataPacket } from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';
import { revalidatePage } from 'src/utils/api';
import db from 'src/utils/db';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image_url: string;
  published_at: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        await getOneNews(req, res);
      } else {
        await getNews(req, res);
      }
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
      'SELECT * FROM collection_news ORDER BY published_at DESC LIMIT ?,?',
      [offset, limit]
    );

    const [totalResults] = (await db.execute(
      'SELECT COUNT(*) AS total FROM collection_news'
    )) as RowDataPacket[];

    const total = totalResults[0].total;

    res.status(200).json({ news, total });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Получение одной новости по идентификатору
async function getOneNews(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  try {
    const [news] = await db.execute<RowDataPacket[]>('SELECT * FROM collection_news WHERE id = ?', [
      id,
    ]);

    if (!news || news.length === 0) {
      return res.status(404).json({ error: 'News not found' });
    }

    res.status(200).json(news[0] as NewsItem);
  } catch (error) {
    console.error('Error fetching one news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Добавление новости
async function addNews(req: NextApiRequest, res: NextApiResponse) {
  const {
    title,
    alias,
    content,
    short_text,
    imageUrl,
    meta_title,
    meta_description,
    meta_keywords,
    og_description,
    og_locale,
    og_image,
    isPublic,
  } = req.body;

  if (
    !title ||
    !alias ||
    !content ||
    !short_text ||
    !imageUrl ||
    !meta_title ||
    !meta_description ||
    !meta_keywords ||
    !og_description ||
    !og_locale ||
    !og_image
  ) {
    return res.status(400).json({
      error:
        'title, alias, content, short_text, image_url, meta_title, meta_description, meta_keywords, og_description, og_locale, og_image are required' +
        `${!!title},${!!alias},${!!content},${!!short_text},${!!imageUrl},${!!meta_title},${!!meta_description},${!!meta_keywords},${!!og_description},${!!og_locale},${!!og_image}`,
    });
  }

  try {
    await db.execute(
      'INSERT INTO collection_news (title, alias, content, short_text, image_url, meta_title, meta_description, meta_keywords, og_description, og_locale, og_image, isPublic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        title,
        alias,
        content,
        short_text,
        imageUrl,
        meta_title,
        meta_description,
        meta_keywords,
        og_description,
        og_locale,
        og_image,
        isPublic,
      ]
    );

    await revalidatePage('media/news/');
    await revalidatePage(`media/news/${alias}`);

    return res.status(201).json({ message: 'News added successfully' });
  } catch (error) {
    console.error('Error adding news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Обновление новости
async function updateNews(req: NextApiRequest, res: NextApiResponse) {
  const {
    id,
    title,
    alias,
    content,
    short_text,
    imageUrl,
    meta_title,
    meta_description,
    meta_keywords,
    og_description,
    og_locale,
    og_image,
    isPublic,
  } = req.body;

  if (!id || !title || !alias || !content || !short_text) {
    return res.status(400).json({
      error:
        'ID, title, alias, content, short_text' +
        `${title},${!!alias},${!!content},${!!short_text}`,
    });
  }

  try {
    await db.execute(
      'UPDATE collection_news SET title=?, alias=?, content=?, short_text=?,image_url=?, meta_title=?, meta_description=?, meta_keywords=?, og_description=?, og_locale=?, og_image=?, isPublic=? WHERE id=?',
      [
        title,
        alias,
        content,
        short_text,
        imageUrl,
        meta_title,
        meta_description,
        meta_keywords,
        og_description,
        og_locale,
        og_image,
        isPublic,
        id,
      ]
    );

    await revalidatePage('media/news');
    await revalidatePage(`media/news/${alias}`);

    res.status(200).json({ message: 'News updated successfully' });
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Удаление новости
async function deleteNews(req: NextApiRequest, res: NextApiResponse) {
  const { id, alias } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  try {
    await db.execute('DELETE FROM collection_news WHERE id=?', [id]);

    await revalidatePage('media/news/');
    await revalidatePage(`media/news/${alias}`);

    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
