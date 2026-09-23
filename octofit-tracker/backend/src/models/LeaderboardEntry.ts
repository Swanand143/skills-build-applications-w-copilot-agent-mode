import { Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0, default: 0 },
    period: { type: String, required: true, default: 'all-time' },
  },
  { timestamps: true },
);

leaderboardEntrySchema.index({ period: 1, points: -1 });

export default model('LeaderboardEntry', leaderboardEntrySchema);