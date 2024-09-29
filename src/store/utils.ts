import { FilterFormState } from '../types';

export const loadFilterFormState = () => {
    try {
        const serializedState = localStorage.getItem('filterFormState');
        if (serializedState === null) {
            return undefined; // Используйте дефолтное состояние, если ничего не сохранено
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Не удалось загрузить состояние filterForm из localStorage:', err);
        return undefined;
    }
};

export const saveFilterFormState = (state: FilterFormState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('filterFormState', serializedState);
    } catch (err) {
        console.error('Не удалось сохранить состояние filterForm в localStorage:', err);
    }
};
