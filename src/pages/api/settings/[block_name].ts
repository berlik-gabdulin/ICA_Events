import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../utils/db';
import { IAPIError, IPageBlock } from 'src/utils/types';
import { RowDataPacket } from 'mysql2';

const AboutPageBlock = async (
  req: NextApiRequest,
  res: NextApiResponse<IPageBlock | IAPIError>
) => {
  const { block_name } = req.query;

  if (req.method === 'GET') {
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT * FROM page_settings WHERE block_name = ?',
        [block_name]
      );
      if (rows.length) {
        return res.status(200).json(rows[0] as IPageBlock);
      } else {
        return res.status(404).json({ error: 'Content not found' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Data fetch error' });
    }
  } else if (req.method === 'POST') {
    const { content } = req.body;
    try {
      await pool.execute('UPDATE page_settings SET content = ? WHERE block_name = ?', [
        content,
        block_name,
      ]);
      return res.status(200).json({ message: 'Changes have been saved' });
    } catch (error) {
      return res.status(500).json({ error: 'Error during data update' });
    }
  } else {
    return res.status(405).end();
  }
};

export default AboutPageBlock;
