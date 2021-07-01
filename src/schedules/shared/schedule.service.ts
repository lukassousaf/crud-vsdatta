import { Body, Injectable, NotFoundException, Post } from '@nestjs/common';
import { Schedule } from './schedule';
import { InjectModel} from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { addHours, subHours } from 'date-fns';

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

    async cancelSchedule(id: string) {
        const schedule = await this.getById(id);

        if(!schedule) {
            throw new NotFoundException("Agendamento não encontrado");
        }

        const scheduleDate = new Date(schedule.scheduleDate);
        const limitDate = subHours(scheduleDate, 6);
        const currentDate = new Date()

        console.log(limitDate, currentDate)

        if(limitDate > currentDate) {
            await this.delete(id);
            return true;
        } else {
            return false;
        }

    }

}
