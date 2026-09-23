import { Router } from 'express';
import Workout from '../../models/Workout.js';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(await Workout.find().sort({ createdAt: -1 }));
});

router.post('/', async (request, response) => {
  const workout = await Workout.create(request.body);
  response.status(201).json(workout);
});

export default router;