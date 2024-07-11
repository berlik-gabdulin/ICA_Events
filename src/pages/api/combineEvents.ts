import { RowDataPacket } from 'mysql2';
import type { NextApiRequest, NextApiResponse } from 'next';
import db from 'src/utils/db';
import { TEvent } from 'src/utils/types';

const combineEvents = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Получение и объединение событий из блоков 'events' и 'manual'
    const [rows] = (await db.execute(
      'SELECT content, block_name FROM page_events WHERE block_name IN (?, ?)',
      ['events', 'manual']
    )) as RowDataPacket[];

    let combinedEvents: TEvent[] = [];

    for (const row of rows as RowDataPacket[]) {
      const content = JSON.parse(row.content);
      combinedEvents = [...combinedEvents, ...content];
    }

    combinedEvents.sort((a: TEvent, b: TEvent) => a.beginDate.localeCompare(b.beginDate));

    // Обновление блока 'allEvents' с объединёнными событиями
    const updatedContent = JSON.stringify(combinedEvents);

    await db.execute('UPDATE page_events SET content = ? WHERE block_name = ?', [
      updatedContent,
      'allEvents',
    ]);

    // Обновление блока 'events' в 'page_home'
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

    res.status(200).json({ status: true, combinedEvents });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

export default combineEvents;
