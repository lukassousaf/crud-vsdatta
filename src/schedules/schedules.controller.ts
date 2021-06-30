import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Schedule } from './shared/schedule';
import { ScheduleService } from './shared/schedule.service';

@Controller('schedules')
export class SchedulesController {

    constructor(private scheduleService: ScheduleService) {}

    @Get()
    async getAll() : Promise<Schedule[]> {
        return this.scheduleService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) : Promise<Schedule> {
        return this.scheduleService.getById(id);
    }

    @Post()
    async create(@Body() schedule: Schedule) : Promise<Schedule> {
        return this.scheduleService.create(schedule);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() schedule: Schedule) : Promise<Schedule> {
        return this.scheduleService.update(id, schedule)
    }
    @Delete(':id')
    async delete(@Param('id') id: string) {
        this.scheduleService.delete(id);
    }
}
