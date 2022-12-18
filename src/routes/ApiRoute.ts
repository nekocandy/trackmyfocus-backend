import {
  NextFunction, Response, Router,
} from 'express';
import { verify } from '../utils/jwt';
import prisma from '../utils/prisma';
import { CustomRequest } from '../utils/types';

const router = Router();

const checkToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'You must be logged in' });
  }

  const token = authorization.replace('Bearer ', '');
  const { email } = verify(token, { }) as any;

  if (email) {
    req.email = email;
    return next();
  }
  return res.status(401).json({ error: 'You must be logged in' });
};

router.use(checkToken);

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/sessions/create', async (req: CustomRequest, res: Response) => {
  const mail = req.email;

  const { sessionName } = req.body;

  if (!mail) {
    return res.status(401).json({ error: 'You must be logged in' });
  }

  if (!sessionName) {
    return res.status(400).json({ error: 'Session name is required' });
  }

  const created = await prisma.sessions.create({
    data: {
      email: mail,
      session: sessionName,
    },
  });

  return res.json(created);
});

router.post('/sessions/record', async (req: CustomRequest, res: Response) => {
  const mail = req.email;

  const { sessionId } = req.body;

  if (!mail) {
    return res.status(401).json({ error: 'You must be logged in' });
  }

  if (!sessionId) {
    return res.status(400).json({ error: 'Session ID is required' });
  }

  const created = await prisma.focus.create({
    data: {
      email: mail,
      sessionId,
    },
  });

  return res.json(created);
});

router.post('/sessions/stop', async (req: CustomRequest, res: Response) => {
  const mail = req.email;

  const { sessionId } = req.body;

  if (!mail) {
    return res.status(401).json({ error: 'You must be logged in' });
  }

  if (!sessionId) {
    return res.status(400).json({ error: 'Session name is required' });
  }

  const updated = await prisma.sessions.update({
    where: {
      id: sessionId,
    },
    data: {
      completedAt: new Date(),
    },
  });

  return res.json(updated);
});

export default router;
