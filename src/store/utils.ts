import { FilterFormState, SubjectsState } from '../types';

const loadFromLocalStorage = (key: string) => {
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error(`Не удалось загрузить состояние ${key} из localStorage:`, err);
        return undefined;
    }
};

const saveToLocalStorage = <T>(key: string, state: T) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(key, serializedState);
    } catch (err) {
        console.error(`Не удалось сохранить состояние ${key} в localStorage:`, err);
    }
};

export const loadFilterFormState = () => {
    return loadFromLocalStorage('filterFormState');
};

export const saveFilterFormState = (state: FilterFormState) => {
    return saveToLocalStorage<FilterFormState>('filterFormState', state);
};

export const loadSubjectsState = () => {
    return loadFromLocalStorage('subjectsState');
};

export const saveSubjectsState = (state: SubjectsState) => {
    return saveToLocalStorage<SubjectsState>('subjectsState', state);
};
