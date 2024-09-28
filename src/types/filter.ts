// Уровень специалиста
export enum Level {
    Basic = 0,    // Базовый
    Premium = 1,  // Премиум
}

// Пол пользователя
export enum Sex {
    Male = 1,   // Мужской
    Female = 2, // Женский
}

export interface FilterFormState {
    sex: string;
    topic: string;
    level: string;
    rating: string;
    ageFrom: string;
    ageTo: string;
}