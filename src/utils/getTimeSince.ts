/**
 * Возвращает строку, описывающую, сколько времени прошло с указанной даты до текущего момента.
 * Формат: "2 часа назад", "3 дня назад", "1 неделю назад", "2 месяца назад".
 * dateString - Строка даты в формате ISO 8601 (например, "2024-09-17T13:09:12.1966667").
 * Возвращает cтроку с описанием времени или `null`, если строка даты некорректна или находится в будущем.
 */

export const getTimeSince = (dateString: string): string | null => {
    const date = new Date(dateString);

    // Проверка корректности даты
    if (isNaN(date.getTime())) {
        console.error('Некорректный формат даты:', dateString);
        return null;
    }

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    // Проверка, что дата не в будущем
    if (diffMs < 0) {
        console.warn('Дата в будущем:', dateString);
        return null;
    }

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30); // Примерное значение
    const years = Math.floor(days / 365); // Добавляем годы, если нужно

    /**
     * Возвращает правильную форму слова в зависимости от числа.
     * n - Число.
     * forms - Массив форм слова: [единственное, родительное единственное, родительное множественное].
     * Возвращает правильную форма слова.
     */
    const getPlural = (n: number, forms: [string, string, string]): string => {
        const mod10 = n % 10;
        const mod100 = n % 100;

        if (mod10 === 1 && mod100 !== 11) {
            return forms[0];
        }
        if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) {
            return forms[1];
        }
        return forms[2];
    };

    if (years >= 1) {
        return `${years} ${getPlural(years, ['год', 'года', 'лет'])} назад`;
    } else if (months >= 1) {
        return `${months} ${getPlural(months, ['месяц', 'месяца', 'месяцев'])} назад`;
    } else if (weeks >= 1) {
        return `${weeks} ${getPlural(weeks, ['неделю', 'недели', 'недель'])} назад`;
    } else if (days >= 1) {
        return `${days} ${getPlural(days, ['день', 'дня', 'дней'])} назад`;
    } else if (hours >= 1) {
        return `${hours} ${getPlural(hours, ['час', 'часа', 'часов'])} назад`;
    } else if (minutes >= 1) {
        return `${minutes} ${getPlural(minutes, ['минуту', 'минуты', 'минут'])} назад`;
    } else {
        return 'только что';
    }
};
