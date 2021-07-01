import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Schedule } from './shared/schedule';
import { ScheduleService } from './shared/schedule.service';
import { JwtAuthGuard } from '../auth/shared/jwt-auth.guard';
import { Response } from 'express';


@Controller('schedules')
export class SchedulesController {

    constructor(private scheduleService: ScheduleService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll() : Promise<Schedule[]> {
        return this.scheduleService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getById(@Param('id') id: string) : Promise<Schedule> {
        return this.scheduleService.getById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() schedule: Schedule) : Promise<Schedule> {
        return this.scheduleService.create(schedule);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() schedule: Schedule) : Promise<Schedule> {
        return this.scheduleService.update(id, schedule)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        this.scheduleService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/cancel/:id')
    async cancelSchedule(@Param('id') id: string, @Res() res: Response) {
        const scheduleWasCancelled = await this.scheduleService.cancelSchedule(id);
        if(scheduleWasCancelled) {
            res.status(HttpStatus.OK).send({ response: 'Agendamento cancelado com sucesso' })
        } else {
            res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({response: 'Só é possível cancelar o agendamento até 6 horas antes do serviço ser prestado.'})
        }

    }
}
