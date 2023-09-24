import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function deleteFileOrDirectory(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).end();
  }

  const { fileUrl, folder } = req.query;

  if (!fileUrl && !folder) {
    return res.status(400).json({ error: 'Either fileUrl or folder parameter is required' });
  }

  if (fileUrl) {
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

  if (folder) {
    const folderPath = path.join(process.cwd(), 'public/uploads/', folder as string);
    console.log(folderPath);
    try {
      if (fs.existsSync(folderPath)) {
        fs.rmdirSync(folderPath, { recursive: true });
        return res.status(200).json({ message: 'Folder successfully deleted' });
      } else {
        return res.status(404).json({ error: 'Folder not found' });
      }
    } catch (error) {
      console.error('Error deleting folder:', error);
      return res.status(500).json({ error: 'An error occurred while deleting the folder' });
    }
  }
}
