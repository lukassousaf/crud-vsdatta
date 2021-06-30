import { Body, Injectable, Post } from '@nestjs/common';
import { Schedule } from './schedule';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class ScheduleService {

    constructor(@InjectModel('Schedule') private readonly scheduleModel: Model<Schedule>) {}

    async getAll() {
        return await this.scheduleModel.find().exec();
    }

    async getById(id: string) {
        return await this.scheduleModel.findById(id).exec();
    }

    async create(schedule: Schedule) {
        const createdSchedule = new this.scheduleModel(schedule);
        return await createdSchedule.save();
    }

    async update(id: string, schedule: Schedule) {
        await this.scheduleModel.updateOne({ _id: id }, schedule).exec()
        return this.getById(id);
    }

    async delete(id: string) {
        return await this.scheduleModel.deleteOne({ _id: id }).exec()
    }



}
