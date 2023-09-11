import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../utils/db';

const GetSettingsPage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const [rows] = await db.execute('SELECT * FROM `page_settings` ORDER BY `order_number` ASC');
      return res.status(200).json(rows);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Data fetch error' });
    }
  } else {
    return res.status(405).end();
  }
};

export default GetSettingsPage;
