import { Module } from '@nestjs/common';
import { SchedulesController } from './schedules.controller';
import { Schedule } from './shared/schedule';
import { ScheduleService } from './shared/schedule.service';
import { ScheduleSchema} from './schemas/schedule.schema'
import { MongooseModule} from '@nestjs/mongoose'

@Module({
    imports: [
        MongooseModule.forFeature([{name:'Schedule', schema: ScheduleSchema}])],
    controllers: [SchedulesController],
    providers: [ScheduleService],
})
export class SchedulesModule {}
