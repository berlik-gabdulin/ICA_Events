import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File } from 'formidable';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

export const config = {
  api: {
    bodyParser: false,
  },
};

interface UploadedFile {
  url: string;
  name?: string | null;
  size?: number;
  type?: string;
}

type UploadResponse = UploadedFile[];

function changeFilesOwner(uploadResponse: UploadResponse): Promise<void[]> {
  const promises = uploadResponse.map(
    (file) =>
      new Promise<void>((resolve, reject) => {
        const filePath = `${process.env.NEXT_PUBLIC_API_BASE_URL}${file.url}`;
        const command = `chown icaeventscom:icaeventscom ${filePath}`;

        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`Ошибка выполнения команды для файла ${file.name}: ${error.message}`);
            reject(error);
            return;
          }
          if (stderr) {
            console.error(`Ошибка для файла ${file.name}: ${stderr}`);
            reject(new Error(stderr));
            return;
          }
          console.log(`Права файла ${file.name} изменены: ${stdout}`);
          resolve();
        });
      })
  );

  return Promise.all(promises);
}

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
    const fileDetails: UploadedFile[] = [];

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
          fileDetails.push({
            url: `/uploads/${folder}/${fileData.originalFilename}`,
            name: fileData.originalFilename,
            size: fileData.size,
            type:
              fileData.mimetype?.split('/')[1] !== 'undefined'
                ? fileData.mimetype?.split('/')[1]
                : fileData.mimetype,
          });
        } catch (error) {
          console.error(`Error while moving file ${fileData.originalFilename}:`, error);
          return res.status(500).json({ error: 'Ошибка при перемещении файла' });
        }
      }
    }

    changeFilesOwner(fileDetails);

    res.status(200).json({ urls: uploadedFiles, files: fileDetails, location: uploadedFiles[0] });
  });
}
