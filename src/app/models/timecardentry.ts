
import { CalendarEvent } from 'angular-calendar';
import { Employee } from './employee';


export interface TimeCardEntry {
    id: number;
    employee: Employee;
    eventstart: Date;
    eventend: Date;
    worktask: string;
    value: number;
    colour: {};
    badgecolor?: string;
}

export interface TimeCardEntryEvent extends CalendarEvent {
    timecardentry: TimeCardEntry;
}
