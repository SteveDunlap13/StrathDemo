
import { CalendarEvent } from 'angular-calendar';



export interface TimeCard {

    id: number;
    employeeId: number;
    weekNum: number;
    timeCardEntries: TimeCardEntry[];
}

export interface TimeCardEntry {

    id: number;
    workTask: string;
    dayCode: number;
    value: number;
}

export interface TimeCardEvent extends CalendarEvent {
    timecard: TimeCard;
}
