import { BadRequestException, Body, Injectable, NotFoundException, Post } from '@nestjs/common';
import { Schedule } from './schedule';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { addHours, addMinutes, isWithinInterval, subDays, subHours, subMinutes } from 'date-fns';
import { start } from 'repl';

const MAX_SCHEDULES = 3;

@Injectable()
export class ScheduleService {

    constructor(@InjectModel('Schedule') private readonly scheduleModel: Model<Schedule>) { }

    async getAll() {
        return await this.scheduleModel.find().exec();
    }

    async getById(id: string) {
        return await this.scheduleModel.findById(id).exec();
    }

    async create(schedule: Schedule) {
        const createdSchedule = new this.scheduleModel(schedule)
        const inicialDate = new Date(schedule.scheduleDate).setHours(9, 0, 0, 0)
        const finalDate = new Date(schedule.scheduleDate).setHours(16, 0, 0, 0)
        const limitDay = subDays(new Date(schedule.scheduleDate), 3)


        if (!isWithinInterval(new Date(schedule.scheduleDate), { start: inicialDate, end: finalDate })) {
            throw new BadRequestException("Horário não disponível (9:00 -16:00) / Só é possível agendar até 72h antes do horário do serviço");
        }
        if (limitDay > new Date()) {

            throw new BadRequestException("Só é possível agendar até 72h antes do horário do serviço");
        }

        
        const startDate = subMinutes(new Date(schedule.scheduleDate),10)
        const endDate = addMinutes(new Date(schedule.scheduleDate),10)
        const  beforeSchedule = await this.getSchedulesBetweenDate(new Date(schedule.scheduleDate), endDate )
        const afterSchedule = await this.getSchedulesBetweenDate(startDate, new Date(schedule.scheduleDate))  
        
        if ( beforeSchedule.length > 0 || afterSchedule. length > 0 ) {    
            throw new BadRequestException("Um apontamento só pode ser feito no intervalo de 10 minutos. ")
        }
        const schedules = await this.getSchedulesByDate(new Date(schedule.scheduleDate))
        if (schedules.length >= MAX_SCHEDULES) {
            throw new BadRequestException("Não é possível agendar mais de 3 carros em um só horário. ")
        }



        return await createdSchedule.save();
    }

    async getSchedulesByDate(date: Date) {
        return await this.scheduleModel.find({
            scheduleDate: date
        })
    }

    async getSchedulesBetweenDate(startDate: Date, endDate: Date) {
        return await this.scheduleModel.find({
            scheduleDate: {
                $gt: startDate,
                $lt: endDate
            }
        })
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

        if (!schedule) {
            throw new NotFoundException("Agendamento não encontrado");
        }

        const scheduleDate = new Date(schedule.scheduleDate);
        const limitDate = subHours(scheduleDate, 6);
        const currentDate = new Date()

        if (limitDate > currentDate) {
            await this.delete(id);
            return true;
        } else {
            return false;
        }

    }

}
