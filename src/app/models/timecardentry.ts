
import { CalendarEvent } from 'angular-calendar';
import { Employee } from './employee';


export interface TimeCardEntry {
    id: number;
    employee: Employee;

    eventstart: Date;
    eventend: Date;

    colour: {};
    badgecolour: string;

    worktype: WorkType;             // work type from api
    piworktype: PIWorkType;         // project / initiative from api
    worktypedescription?: string;   // description for work types not project or initiative
    worktask?: WorkTask;            // work task id from api
    value: number;                  // hours for this instance
}

export interface TimeCardEntryEvent extends CalendarEvent {
    timecardentry: TimeCardEntry;
}

export interface WorkType {
    id: number;
    name: string;
    type: string;   // P - Project, I - Initative, O= Other
}

export interface PIWorkType {
    id: number;
    code: string;
    name: string;
    type: string; // P for projects, I for Initiatives (not visible in UI, remove here?)
}

export interface WorkTask {
    id: number;
    name: string;
}
