import mongoose from 'mongoose';
import { connectionString } from '../config/database.js';
import Activity from '../models/Activity.js';
import LeaderboardEntry from '../models/LeaderboardEntry.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

async function seedDatabase() {
  try {
    // Seed the octofit_db database with test data
    console.log('Seed command: npm run seed populates test data for the OctoFit Tracker application by resetting octofit_db.');
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'alex.runner',
        email: 'alex.runner@example.com',
        displayName: 'Alex Runner',
      },
      {
        username: 'jamie.lifts',
        email: 'jamie.lifts@example.com',
        displayName: 'Jamie Lifts',
      },
      {
        username: 'taylor.trails',
        email: 'taylor.trails@example.com',
        displayName: 'Taylor Trails',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Summit Seekers',
        description: 'A team focused on consistent outdoor activity.',
        members: [users[0]._id, users[2]._id],
      },
      {
        name: 'Power Circuit',
        description: 'Strength and conditioning accountability partners.',
        members: [users[1]._id],
      },
    ]);

    await Activity.insertMany([
      { userId: users[0]._id, type: 'Run', durationMinutes: 35, calories: 320, recordedAt: new Date('2026-09-20') },
      { userId: users[1]._id, type: 'Strength training', durationMinutes: 45, calories: 280, recordedAt: new Date('2026-09-21') },
      { userId: users[2]._id, type: 'Hiking', durationMinutes: 90, calories: 610, recordedAt: new Date('2026-09-22') },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: users[2]._id, points: 1280, period: 'all-time' },
      { userId: users[0]._id, points: 1125, period: 'all-time' },
      { userId: users[1]._id, points: 980, period: 'all-time' },
    ]);

    await Workout.insertMany([
      {
        name: 'Quick Start Cardio',
        description: 'A low-impact session to build an aerobic base.',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['Brisk walk', 'Step-ups', 'Cool down'],
      },
      {
        name: 'Full Body Circuit',
        description: 'A balanced strength circuit for the whole body.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        exercises: ['Squats', 'Push-ups', 'Reverse lunges', 'Plank'],
      },
      {
        name: 'Peak Conditioning',
        description: 'A demanding interval workout for experienced athletes.',
        difficulty: 'advanced',
        durationMinutes: 45,
        exercises: ['Burpees', 'Mountain climbers', 'Jump squats', 'Sprint intervals'],
      },
    ]);

    console.log('Database seeding complete: 3 users, 2 teams, 3 activities, 3 leaderboard entries, and 3 workouts.');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
