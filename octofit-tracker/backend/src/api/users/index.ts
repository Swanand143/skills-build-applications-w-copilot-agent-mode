import { Router } from 'express';
import User from '../../models/User.js';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(await User.find().sort({ createdAt: -1 }));
});

router.post('/', async (request, response) => {
  const user = await User.create(request.body);
  response.status(201).json(user);
});

export default router;