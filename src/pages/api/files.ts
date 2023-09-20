import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const GetFiles = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const files = fs.readdirSync(uploadsDir);

    const chonkyFiles = files.map((fileName, index) => ({
      id: String(index),
      name: fileName,
      isDir: fs.statSync(path.join(uploadsDir, fileName)).isDirectory(),
    }));

    res.status(200).json(chonkyFiles);
  } catch (error) {
    res.status(500).json({ error: 'Could not read the directory' });
  }
};

export default GetFiles;
