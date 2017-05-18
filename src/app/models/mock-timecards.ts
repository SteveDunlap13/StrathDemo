
import { TimeCardEntry } from './timecard';
import { COLOURS } from '../shared/colours';


export var TIMECARDENTRIES: TimeCardEntry[] = [

    {
        id: 1,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },
        eventstart: new Date(),
        eventend: new Date(),
        workTask: 'a work task',
        value: 2.5,
        colour: COLOURS.red
    },
    {
        id: 2,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },
        eventstart: new Date(),
        eventend: new Date(),
        workTask: 'a work task',
        value: 2.5,
        colour: COLOURS.yellow
    },
    {
        id: 3,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },
        eventstart: new Date(),
        eventend: new Date(),
        workTask: 'a work task',
        value: 2.5,
        colour: COLOURS.blue
    }
];
