import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPageBlock } from 'src/utils/api';
import fetch from 'node-fetch';
import pool from 'src/utils/db';

interface IAPIConfig {
  label: string;
  apiUrl: string;
  apiKey: string;
  country: string;
}

interface IEvent {
  title: string;
  description: string;
  website: string;
  country: string;
  image_profile: string;
  beginDate: string;
  endDate: string;
  location: string;
  industry: string;
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
    console.log('config', config);
    const { apiUrl, apiKey, country } = config;
    const events = await fetchDataFromAPI(apiUrl, apiKey);
    console.log('events from API', events);
    allEvents[country] = events;
  }

  return allEvents;
};

const saveEventsToDB = async (allEvents: Record<string, IEvent[]>, res: NextApiResponse) => {
  try {
    await pool.execute(`UPDATE page_events SET content = ? WHERE block_name = 'events'`, [
      JSON.stringify(allEvents),
    ]);
    return res.status(200).json({ message: 'Changes have been saved' });
  } catch (error) {
    return res.status(500).json({ error: 'Error during data update', message: error });
  }
};

const FetchEvents = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Шаг 1: Получение конфигураций API
    const apiConfigs = await fetchAPIConfigs();

    // Шаг 2: Получение данных от каждого API
    const allEvents = await fetchAllEvents(apiConfigs);

    // Шаг 3: Сохранение данных в БД
    await saveEventsToDB(allEvents, res);

    res.status(200).json({ message: 'Events fetched and saved successfully!' });
  } catch (err) {
    console.error('An error occurred:', err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
};

export default FetchEvents;
