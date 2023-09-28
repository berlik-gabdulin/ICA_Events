import { createPool } from 'mysql2/promise';

const pool = createPool({
  host: 'db.ica-events.com',
  user: 'icaeventscom_berlik',
  database: 'icaeventscom_main',
  password: 'BerlikAdmin2018',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
