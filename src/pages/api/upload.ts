import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function upload(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const form = new IncomingForm();
  const folder = req.query.folder || 'default';
  const uploadDir = path.join(process.cwd(), `/public/uploads/${folder}`);

  // Создаем папку, если ее нет
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  (form as any).uploadDir = uploadDir;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error while parsing form:', err);
      return res.status(500).json({ error: 'Ошибка при загрузке файла' });
    }

    const uploadedFiles = [];

    for (const [key, fileArray] of Object.entries(files)) {
      if (!Array.isArray(fileArray)) {
        console.error(`No files for ${key} in request`);
        return res.status(400).json({ error: 'Файлы не найдены' });
      }

      for (const file of fileArray) {
        const fileData = file as unknown as File;
        const newPath = path.join((form as any).uploadDir, (fileData as any).originalFilename);

        try {
          await fs.promises.rename(fileData.filepath, newPath);

          uploadedFiles.push(`/uploads/${folder}/${fileData.originalFilename}`);
        } catch (error) {
          console.error(`Error while moving file ${fileData.originalFilename}:`, error);
          return res.status(500).json({ error: 'Ошибка при перемещении файла' });
        }
      }
    }

    res.status(200).json({ urls: uploadedFiles });
  });
}
