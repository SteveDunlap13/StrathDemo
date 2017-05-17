

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
