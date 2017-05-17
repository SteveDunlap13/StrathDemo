
import { TimeCard } from './timecard';


export var TIMECARDS: TimeCard[] = [

    {
        id: 1, employeeId: 3628, weekNum: 20, timeCardEntries: [
            { id: 1, workTask: 'Execution', dayCode: 2, value: 2.5 },
            { id: 2, workTask: 'Closing', dayCode: 2, value: 3.5 },
            { id: 3, workTask: 'Testing', dayCode: 2, value: 1.5 }
        ]
    },
    {
        id: 2, employeeId: 3628, weekNum: 21, timeCardEntries: [
            { id: 1, workTask: 'Execution', dayCode: 2, value: 7.5 },
            { id: 2, workTask: 'Closing', dayCode: 3, value: 7.5 },
            { id: 3, workTask: 'Testing', dayCode: 4, value: 7.5 }
        ]
    },
    {
        id: 3, employeeId: 3628, weekNum: 22, timeCardEntries: [
            { id: 1, workTask: 'Execution', dayCode: 1, value: 7.5 },
            { id: 2, workTask: 'Closing', dayCode: 2, value: 7.5 },
            { id: 3, workTask: 'Testing', dayCode: 3, value: 7.5 }
        ]
    }
];
