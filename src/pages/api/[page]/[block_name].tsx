import { NextApiRequest, NextApiResponse } from 'next';
import pool from 'src/utils/db';
import { IAPIError, IPageBlock, IUpdateBlockData } from 'src/utils/types';
import { RowDataPacket } from 'mysql2';

const GetPageBlock = async (req: NextApiRequest, res: NextApiResponse<IPageBlock | IAPIError>) => {
  const { page, block_name } = req.query;

  console.log(page, block_name);

  if (req.method === 'GET') {
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(
        `SELECT * FROM page_${page} WHERE block_name = ?`,
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
    const updateData: IUpdateBlockData = req.body;
    console.log(updateData);
    const fieldsToUpdate = Object.keys(updateData)
      .map((key) => `${key} = ?`)
      .join(', ');
    const valuesToUpdate = Object.values(updateData);

    console.log('valuesToUpdate', valuesToUpdate);

    console.log(
      `UPDATE page_${page} SET content = ${valuesToUpdate} WHERE block_name = ${block_name}`
    );

    try {
      await pool.execute(`UPDATE page_${page} SET ${fieldsToUpdate} WHERE block_name = ?`, [
        ...valuesToUpdate,
        block_name,
      ]);
      return res.status(200).json({ message: 'Changes have been saved' });
    } catch (error) {
      return res.status(500).json({ error: 'Error during data update', message: error });
    }
  } else {
    return res.status(405).end();
  }
};

export default GetPageBlock;
