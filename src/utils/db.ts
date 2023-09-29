import { createPool } from 'mysql2/promise';

const pool = createPool({
  host: process.env.NEXT_PUBLIC_DB_HOST,
  user: process.env.NEXT_PUBLIC_DB_USER,
  database: process.env.NEXT_PUBLIC_DB_NAME,
  password: process.env.NEXT_PUBLIC_DB_PASS,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
});

export default pool;
