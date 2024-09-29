// Специальность
export enum ProfSpeciality {
    Consultant = 1, // Консультант
    Sexologist = 2, // Сексолог
    Coach = 3, // Коуч
}

// Уровень специалиста
export enum Level {
    Basic = 0, // Базовый
    Premium = 1, // Премиум
}

// Пол пользователя
export enum Sex {
    Male = 1, // Мужской
    Female = 2, // Женский
}

// Статус пользователя
export enum OnlineStatus {
    Offline = 1, // Оффлайн
    Online = 2, // Онлайн
}

// Специалист
export interface Specialist {
    profSpeciality: ProfSpeciality;
    isCertified: boolean;
    userId: string;
    name: string;
    rating: number;
    onlineStatus: OnlineStatus;
    lastActivityTime: string;
    photoUrl: string;
    defaultSubjectName: string;
    sex: Sex;
    birthDate: string;
    age: number;
    subjectsCount: number;
    isFavorite: boolean;
    hasVideo: boolean;
}
