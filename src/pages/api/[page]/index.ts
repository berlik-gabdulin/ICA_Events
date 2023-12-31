import { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/utils/db';

const GetPageData = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page } = req.query;

  if (req.method === 'GET') {
    try {
      const [rows] = await db.execute(`SELECT * FROM page_${page} ORDER BY order_number ASC`);
      return res.status(200).json(rows);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Data fetch error' });
    }
  } else {
    return res.status(405).end();
  }
};

export default GetPageData;
