import { Document } from 'mongoose'
 
export class Schedule extends Document {
    scheduleDate: Date;
    carModel: string;
}
