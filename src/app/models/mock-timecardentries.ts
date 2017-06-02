
import { TimeCardEntry, WorkType, WorkTask, PIWorkType } from './timecardentry';
import { COLOURS } from '../shared/colours';
import { addHours } from 'date-fns';


export let TIMECARDENTRIES: TimeCardEntry[] = [

    {
        id: 1,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },

        eventstart: new Date(),
        eventend: new Date(),

        colour: COLOURS.red,
        badgecolour: COLOURS.red.secondary,

        worktype: { id: 1, name: 'Project Work', type: 'P' },
        piworktype: { id: 2, code: '13659A', name: 'Forensic Toxicology Reporting Enhancements', type: 'P' },
        worktypedescription: '',
        worktask: { id: 4, name: 'Execution - (Application Development Stage)' },
        value: 2.5,
    },
    {
        id: 2,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },

        eventstart: new Date(),
        eventend: new Date(),

        colour: COLOURS.blue,
        badgecolour: COLOURS.blue.secondary,

        worktype: { id: 2, name: 'ITSS Initiative', type: 'I' },
        piworktype: { id: 4, code: 'I999-A', name: 'Max Gold e-Ordering', type: 'I' },
        worktypedescription: '',
        worktask: { id: 11, name: 'Meeting - (Post Implementation/Operation Stage)' },
        value: 5,
    },
    {
        id: 3,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },

        eventstart: new Date(),
        eventend: new Date(),

        colour: COLOURS.red,
        badgecolour: COLOURS.red.secondary,

        worktype: { id: 8, name: 'Support & Maintenance', type: 'O' },
        piworktype: null,
        worktypedescription: 'some meeting that was awesome!',
        worktask: { id: 15, name: 'Other Administration - (Administration)' },
        value: 0.5,
    },
    {
        id: 4,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },

        eventstart: new Date(),
        eventend: new Date(),

        colour: COLOURS.blue,
        badgecolour: COLOURS.blue.secondary,

        worktype: { id: 6, name: 'Meetings - Not related to a Project', type: 'O' },
        piworktype: null,
        worktypedescription: 'some meeting that was awesome!',
        worktask: { id: 15, name: 'Other Administration - (Administration)' },
        value: 0.5,
    },
    {
        id: 4,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },

        eventstart: new Date(),
        eventend: new Date(),

        colour: COLOURS.red,
        badgecolour: COLOURS.red.secondary,

        worktype: { id: 4, name: 'Professional Development', type: 'O' },
        piworktype: null,
        worktypedescription: 'some meeting that was awesome!',
        worktask: { id: 15, name: 'Other Administration - (Administration)' },
        value: 0.5,
    },
    {
        id: 5,
        employee: { id: 3628, firstname: 'Steve', lastname: 'Dunlap' },

        eventstart: new Date(),
        eventend: new Date(),

        colour: COLOURS.yellow,
        badgecolour: COLOURS.yellow.secondary,

        worktype: { id: 5, name: 'Consulting & Collaboration', type: 'O' },
        piworktype: null,
        worktypedescription: 'some meeting that was awesome!',
        worktask: { id: 15, name: 'Other Administration - (Administration)' },
        value: 0.5,
    }

];

export let WORKTYPES: WorkType[] = [
    { id: 1, name: 'Project Work', type: 'P' },
    { id: 2, name: 'ITSS Initiative', type: 'I' },
    { id: 3, name: 'Administration', type: 'O' },
    { id: 4, name: 'Professional Development', type: 'O' },
    { id: 5, name: 'Consulting & Collaboration', type: 'O' },
    { id: 6, name: 'Meetings - Not related to a Project', type: 'O' },
    { id: 7, name: 'Process Improvements', type: 'O' },
    { id: 8, name: 'Support & Maintenance', type: 'O' },
    { id: 9, name: 'Statutory Holiday', type: 'O' },
    { id: 10, name: 'Absense from Work', type: 'O' }
];

export let PIWORKTYPES: PIWorkType[] = [
    { id: 1, code: '13660', name: 'Billing Enhancements', type: 'P' },
    { id: 2, code: '13659A', name: 'Forensic Toxicology Reporting Enhancements', type: 'P' },
    { id: 3, code: 'A123', name: 'Panther Analyzers', type: 'P' },
    { id: 4, code: 'I999-A', name: 'Max Gold e-Ordering', type: 'I' },
    { id: 5, code: 'QAZ-123', name: 'MedLab Integration to Dynacare Next', type: 'I' },
    { id: 6, code: '13655', name: 'Migrate ProClarity to Qlickview', type: 'I' },
];

export let WORKTASKS: WorkTask[] = [
    { id: 1, name: 'Pre-Discovery - (Preliminary Project Stage)' },
    { id: 2, name: 'Initiation - (Preliminary Project Stage)' },
    { id: 3, name: 'Planning - (Preliminary Project Stage)' },
    { id: 4, name: 'Execution - (Application Development Stage)' },
    { id: 5, name: 'Closing - (Application Development Stage)' },
    { id: 6, name: 'Compliance / Security - (Application Development Stage)' },
    { id: 7, name: 'IT Architecture Standards - (Application Development Stage)' },
    { id: 8, name: 'Testing - (Application Development Stage)' },
    { id: 9, name: 'Support / Sm Incidents - (Post Implementation/Operation Stage)' },
    { id: 10, name: 'Maintenance - (Post Implementation/Operation Stage)' },
    { id: 11, name: 'Meeting - (Post Implementation/Operation Stage)' },
    { id: 12, name: 'Travel - (Administration)' },
    { id: 13, name: 'Training / Conferences - (Post Implementation/Operation Stage)' },
    { id: 14, name: 'Project Management - (Administration)' },
    { id: 15, name: 'Other Administration - (Administration)' }
];
