
import { TimeCardEntry } from './timecardentry';
import { COLOURS } from '../shared/colours';
import { addHours } from 'date-fns';


export var TIMECARDENTRIES: TimeCardEntry[] = [

    {
        id: 1,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },
        eventstart: new Date(),
        eventend: addHours(new Date(), 2.5),
        worktask: 'Project 1234',
        value: 2.5,
        colour: COLOURS.red,
        badgecolour: 'red',
        allDay: false
    },
    {
        id: 2,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },
        eventstart: new Date(),
        eventend: addHours(new Date(), 2),
        worktask: 'Project 1234',
        value: 2,
        colour: COLOURS.red,
        badgecolour: 'red',
        allDay: false
    },
    {
        id: 3,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },
        eventstart: new Date(),
        eventend: addHours(new Date(), 1.5),
        worktask: 'Project 1234',
        value: 1.5,
        colour: COLOURS.red,
        badgecolour: 'red',
        allDay: false
    },
    {
        id: 4,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },
        eventstart: new Date(),
        eventend: addHours(new Date(), 3),
        worktask: 'Testing',
        value: 3,
        colour: COLOURS.blue,
        badgecolour: 'blue',
        allDay: false
    },
    {
        id: 5,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },
        eventstart: new Date(),
        eventend: new Date(),
        worktask: 'Planning',
        value: 0,
        colour: COLOURS.yellow,
        badgecolour: 'yellow',
        allDay: true
    }
];
