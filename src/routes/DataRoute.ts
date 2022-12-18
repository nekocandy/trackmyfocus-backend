import { Request, Response, Router } from 'express';
import prisma from '../utils/prisma';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.get('/data/:sessionId', async (req: Request, res: Response) => {
  const { sessionId } = req.params;

  if (!sessionId) {
    return res.status(400).json({ error: 'Session ID is required' });
  }

  const data = await prisma.sessions.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      Focus: {
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          email: true,
          sessionId: true,
        },
      },
    },
  });

  if (data) {
    return res.json(data);
  }
  return res.status(404).json({ error: 'Session not found' });
});

router.get('/sessions/:email', (req: Request, res: Response) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const data = prisma.sessions.findMany({
    where: {
      email,
    },
  });

  if (data) {
    return res.json(data);
  }

  return res.status(404).json({ error: 'No sessions found' });
});

export default router;
