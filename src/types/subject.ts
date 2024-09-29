export interface Subject {
    id: number;
    name: string;
    sequence?: string;
}

export interface SubjectsState {
    list: Subject[];
}
