import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface ExtendedNextApiRequest extends NextApiRequest {
  user?: JwtPayload | string;
}

const authMiddleware =
  (handler: NextApiHandler) => async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ error: 'Not authorized' });
      }
      console.log(process.env.JWT_SECRET);
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
      req.user = decoded;

      return handler(req, res);
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: 'Not authorized' });
    }
  };

export default authMiddleware;
