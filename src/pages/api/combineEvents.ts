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

    const [allEventsRow] = (await db.execute(
      'SELECT content FROM page_events WHERE block_name = ?',
      ['allEvents']
    )) as RowDataPacket[];

    const allEventsContent = JSON.parse(allEventsRow[0].content);
    allEventsContent.events = combinedEvents;

    const updatedContent = JSON.stringify(allEventsContent);

    await db.execute('UPDATE page_events SET content = ? WHERE block_name = ?', [
      updatedContent,
      'allEvents',
    ]);

    const [pageHomeRow] = (await db.execute(
      `SELECT content FROM page_home WHERE block_name = 'events'`
    )) as RowDataPacket[];

    const pageHomeContent = JSON.parse(pageHomeRow[0].content);
    pageHomeContent.events = combinedEvents
      .filter((event: TEvent) => new Date() < new Date(event.endDate))
      .slice(0, 9);

    await db.execute(`UPDATE page_home SET content = ? WHERE block_name = 'events'`, [
      JSON.stringify(pageHomeContent),
    ]);

    res.status(200).json(true);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

export default combineEvents;
