import { RowDataPacket } from 'mysql2';
import type { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/utils/db';
import { TEvent } from 'src/utils/types';

const combineEvents = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const [rows] = (await db.execute(
      'SELECT content, block_name FROM page_events WHERE block_name IN (?, ?)',
      ['events', 'manual']
    )) as RowDataPacket[];

    let combinedEvents: TEvent[] = [];

    for (const row of rows as RowDataPacket[]) {
      const content = JSON.parse(row.content);
      combinedEvents = [...combinedEvents, ...content];
    }

    combinedEvents.sort((a: any, b: any) => a.beginDate.localeCompare(b.beginDate));

    const updatedContent = JSON.stringify(combinedEvents);

    await db.execute('UPDATE page_events SET content = ? WHERE block_name = ?', [
      updatedContent,
      'allEvents',
    ]);

    await db.execute(`UPDATE page_home SET content = ? WHERE block_name = 'events'`, [
      JSON.stringify(
        combinedEvents.filter((event: TEvent) => new Date() < new Date(event.endDate)).slice(0, 9)
      ),
    ]);

    res.status(200).json(true);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
export default combineEvents;
