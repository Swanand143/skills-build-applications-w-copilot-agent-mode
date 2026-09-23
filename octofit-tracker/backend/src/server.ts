import express from 'express';
import { connectDatabase } from './config/database.js';
import activitiesRouter from './api/activities/index.js';
import leaderboardRouter from './api/leaderboard/index.js';
import teamsRouter from './api/teams/index.js';
import usersRouter from './api/users/index.js';
import workoutsRouter from './api/workouts/index.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiUrl });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

await connectDatabase();

app.listen(port, () => {
  console.log(`OctoFit API listening at ${apiUrl}`);
});
