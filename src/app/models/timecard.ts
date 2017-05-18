
import { CalendarEvent } from 'angular-calendar';
import { Employee } from './employee';


export interface TimeCardEntry {
    id: number;
    employee: Employee;
    eventstart: Date;
    eventend: Date;
    workTask: string;
    value: number;
    colour: {};
}

export interface TimeCardEntryEvent extends CalendarEvent {
    timecardentry: TimeCardEntry;
}
