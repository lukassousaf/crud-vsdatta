import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchedulesModule } from './schedules/schedules.module';
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://root:root@cluster0.p4h4m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'), SchedulesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
