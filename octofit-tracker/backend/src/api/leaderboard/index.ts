import { Router } from 'express';
import LeaderboardEntry from '../../models/LeaderboardEntry.js';

const router = Router();

router.get('/', async (request, response) => {
  const period = typeof request.query.period === 'string' ? request.query.period : 'all-time';
  const entries = await LeaderboardEntry.find({ period })
    .populate('userId')
    .sort({ points: -1 });
  response.json(entries);
});

router.post('/', async (request, response) => {
  const entry = await LeaderboardEntry.create(request.body);
  response.status(201).json(entry);
});

export default router;