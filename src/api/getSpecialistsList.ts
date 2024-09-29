import { Sex, Level, FilterFormState, Specialist } from '../types';

export interface FetchResponse {
    data: {
        items: Specialist[];
        totalCount: number;
    };
    Message?: string;
}

export interface FetchParams {
    sex?: Sex;
    subjectId?: number;
    level?: Level;
    ratingFrom?: number;
    ratingTo?: number;
    ageFrom?: number;
    ageTo?: number;
}

function convertStateToFetchParams(state: FilterFormState): FetchParams {
    const params: FetchParams = {};

    if (state.sex && !isNaN(Number(state.sex))) {
        params.sex = Number(state.sex) as Sex;
    }

    if (state.subjectId) {
        const subjectId = Number(state.subjectId);
        if (!isNaN(subjectId)) {
            params.subjectId = subjectId;
        }
    }

    if (state.level) {
        params.level = Number(state.level) as Level;
    }

    if (state.rating) {
        const ratingNumber = Number(state.rating);
        if (!isNaN(ratingNumber) && ratingNumber >= 0) {
            if (ratingNumber === 0) {
                params.ratingFrom = 0;
                params.ratingTo = 0;
            } else if (ratingNumber === 100) {
                params.ratingFrom = 80;
                params.ratingTo = 100;
            } else if (ratingNumber === 79) {
                params.ratingFrom = 60;
                params.ratingTo = 79;
            } else if (ratingNumber === 59) {
                params.ratingFrom = 40;
                params.ratingTo = 59;
            }
        }
    }

    const ageFromNumber = Number(state.ageFrom);
    if (!isNaN(ageFromNumber) && ageFromNumber >= 0) {
        params.ageFrom = ageFromNumber;
    }

    const ageToNumber = Number(state.ageTo);
    if (!isNaN(ageToNumber) && ageToNumber >= 0) {
        params.ageTo = ageToNumber;
    }

    return params;
}

const fetchSpecialists = async (params: FetchParams, offset?: number) => {
    const defaultParams = {
        limit: 12,
        offset: offset ? offset : 0,
    };

    const combinedParams = { ...defaultParams, ...params };

    const searchParams = new URLSearchParams(
        Object.entries(combinedParams)
            // eslint-disable-next-line
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) => [key, value.toString()]),
    );

    try {
        const response = await fetch(`/api/search/specialists?${searchParams.toString()}`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.Message);
        }

        const {
            data: { items, totalCount },
        }: FetchResponse = await response.json();

        return { items, totalCount };
    } catch (error) {
        console.error(error);
    }
};

export const getSpecialistsList = async (formState: FilterFormState, offset?: number) => {
    const params = convertStateToFetchParams(formState);
    return fetchSpecialists(params, offset);
};
