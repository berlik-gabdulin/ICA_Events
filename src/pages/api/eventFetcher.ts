import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPageBlock, revalidatePage } from 'src/utils/api';
import fetch from 'node-fetch';
import pool from 'src/utils/db';
import { formatDateRange } from 'src/utils/formatDateRange';
import dateFormatter from 'src/utils/dateFormatter';

interface IAPIConfig {
  label: string;
  apiUrl: string;
  apiKey: string;
  country: string;
}

interface IEvent {
  id: string;
  title: string;
  description: string;
  image_profile: string;
  beginDate: string;
  endDate: string;
  dateRange: string;
  location: string;
  industry: string;
  website: string;
  country: string;
}

const fetchAPIConfigs = async (): Promise<IAPIConfig[]> => {
  const apiConfigs = await fetchPageBlock('events', 'api');
  return JSON.parse(apiConfigs.content).apis;
};

const fetchDataFromAPI = async (apiUrl: string, apiKey: string): Promise<IEvent[]> => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify({
      apiKey: apiKey,
      lang: 'en',
      projectID: 0,
    }),
  });
  const data: any = await response.json();
  return data.confList;
};

const fetchAllEvents = async (apiConfigs: IAPIConfig[]): Promise<Record<string, IEvent[]>> => {
  const allEvents: Record<string, IEvent[]> = {};

  for (const config of apiConfigs) {
    const { apiUrl, apiKey, country } = config;
    const eventsFromAPI = await fetchDataFromAPI(apiUrl, apiKey);

    // Преобразуем данные
    const events: IEvent[] = eventsFromAPI.map((event: any) => ({
      id: `${event.projectID}`,
      title: event.title,
      description: event.description,
      image_profile: event.image_profile,
      beginDate: dateFormatter(event.beginDate),
      endDate: dateFormatter(event.endDate),
      dateRange: formatDateRange(event),
      location: event.location,
      industry: event.industry,
      website: event.website,
      country: event.country ? event.country : country,
    }));

    // Добавляем события в объект по странам
    allEvents[country] = allEvents[country] || [];
    allEvents[country] = allEvents[country].concat(events);
  }

  // Сортируем события по дате начала
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [country, events] of Object.entries(allEvents)) {
    allEvents[country] = allEvents[country].sort((a: any, b: any) =>
      a.beginDate.localeCompare(b.beginDate)
    );
  }

  return allEvents;
};

const saveEventsToDB = async (allEvents: Record<string, IEvent[]>) => {
  const combinedEvents = Object.entries(allEvents)
    .flatMap(([country, events]) => events as IEvent[])
    .sort((a: any, b: any) => new Date(a.beginDate).getTime() - new Date(b.beginDate).getTime());
  try {
    await pool.execute(`UPDATE page_events SET content = ? WHERE block_name = 'events'`, [
      JSON.stringify(combinedEvents),
    ]);

    return true;
  } catch (error) {
    console.error('Error during data update:', error);
    return false;
  }
};

const FetchEvents = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Шаг 1: Получение конфигураций API
    const apiConfigs = await fetchAPIConfigs();

    // Шаг 2: Получение данных от каждого API
    const allEvents = await fetchAllEvents(apiConfigs);

    // Шаг 3: Сохранение данных в БД
    const isSaved = await saveEventsToDB(allEvents);

    // Шаг 4: Сохранение данных в БД в одной таблице с сортировкой по дате
    const isCombined = await (
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/combineEvents`)
    ).json();

    await revalidatePage('/events');
    await revalidatePage(`/`);

    if (isSaved && isCombined) {
      res.status(200).json({ message: 'Events fetched and saved successfully!' });
    } else {
      res.status(500).json({ error: 'Internal Server Error', message: 'Failed to save data.' });
    }
  } catch (err) {
    console.error('An error occurred:', err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
};

export default FetchEvents;
