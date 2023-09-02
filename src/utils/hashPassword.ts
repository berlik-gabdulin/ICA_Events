// hashPasswordMiddleware.ts

import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import * as bcrypt from 'bcryptjs';

const hashPasswordMiddleware =
  (next: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST' && req.body.password) {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        return next(req, res);
      } catch (error) {
        return res.status(500).json({ error: 'Ошибка при хэшировании пароля' });
      }
    } else {
      return next(req, res);
    }
  };

export default hashPasswordMiddleware;
