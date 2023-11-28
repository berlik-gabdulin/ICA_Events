import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../utils/db';
import { ResultSetHeader } from 'mysql2';
import hashPasswordMiddleware from 'src/utils/hashPassword';

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { name, email, password } = req.body;

  try {
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, password, 'editor']
    );

    const rows = result as ResultSetHeader;
    if (rows.affectedRows > 0) {
      return res.status(201).json({ message: 'User registered successfully' });
    } else {
      return res.status(500).json({ error: 'Register error' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Register error' });
  }
};

export default hashPasswordMiddleware(register); // Применяем middleware к функции регистрации
