
import { TimeCardEntry } from './timecard';
import { COLOURS } from '../shared/colours';


export var TIMECARDENTRIES: TimeCardEntry[] = [

    {
        id: 1,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },
        eventstart: new Date(),
        eventend: new Date(),
        workTask: 'Project 1234',
        value: 2.5,
        colour: COLOURS.red
    },
    {
        id: 2,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },
        eventstart: new Date(),
        eventend: new Date(),
        workTask: 'Project 1234',
        value: 2.5,
        colour: COLOURS.red
    },
    {
        id: 3,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },
        eventstart: new Date(),
        eventend: new Date(),
        workTask: 'Project 1234',
        value: 2.5,
        colour: COLOURS.red
    },
    {
        id: 4,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },
        eventstart: new Date(),
        eventend: new Date(),
        workTask: 'Testing',
        value: 2.5,
        colour: COLOURS.blue
    },
    {
        id: 5,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },
        eventstart: new Date(),
        eventend: new Date(),
        workTask: 'Planning',
        value: 2.5,
        colour: COLOURS.yellow
    }
];
