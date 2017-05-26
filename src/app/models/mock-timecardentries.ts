
import { TimeCardEntry } from './timecardentry';
import { COLOURS } from '../shared/colours';


export var TIMECARDENTRIES: TimeCardEntry[] = [

    {
        id: 1,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },
        eventstart: new Date(),
        eventend: new Date(),
        worktask: 'Project 1234',
        value: 2.5,
        colour: COLOURS.red,
        badgecolor: 'red'
    },
    {
        id: 2,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },
        eventstart: new Date(),
        eventend: new Date(),
        worktask: 'Project 1234',
        value: 2.5,
        colour: COLOURS.red,
        badgecolor: 'red'
    },
    {
        id: 3,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },
        eventstart: new Date(),
        eventend: new Date(),
        worktask: 'Project 1234',
        value: 2.5,
        colour: COLOURS.red,
        badgecolor: 'red'
    },
    {
        id: 4,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },
        eventstart: new Date(),
        eventend: new Date(),
        worktask: 'Testing',
        value: 2.5,
        colour: COLOURS.blue,
        badgecolor: 'blue'
    },
    {
        id: 5,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },
        eventstart: new Date(),
        eventend: new Date(),
        worktask: 'Planning',
        value: 2.5,
        colour: COLOURS.yellow,
        badgecolor: 'yellow'
    }
];
