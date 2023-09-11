import { createPool } from 'mysql2/promise';

const pool = createPool({
  host: 'localhost',
  user: 'user',
  database: 'myDataBase',
  password: '1234',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
