import * as mongoose from 'mongoose';

export const ScheduleSchema = new mongoose.Schema({
    scheduleDate: Date,
    carModel: String
})