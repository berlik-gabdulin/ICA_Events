import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function deleteFile(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).end();
  }

  const { fileUrl } = req.query;

  if (!fileUrl) {
    return res.status(400).json({ error: 'fileUrl parameter is required' });
  }

  const filePath = path.join(process.cwd(), 'public', fileUrl as string);

  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.status(200).json({ message: 'File successfully deleted' });
    } else {
      return res.status(404).json({ error: 'File not found' });
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    return res.status(500).json({ error: 'An error occurred while deleting the file' });
  }
}
