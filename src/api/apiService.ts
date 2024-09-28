import { FilterFormState } from "../types/filter";

interface FetchSpecialistsParams {
    sex?: number;
    topicId?: number;
    level?: number;
    ratingFrom?: number;
    ratingTo?: number;
    ageFrom?: number;
    ageTo?: number;
}

function convertStateToFetchParams(state: FilterFormState): FetchSpecialistsParams {
    const params: FetchSpecialistsParams = {};

    if (state.sex) {
        params.sex = Number(state.sex);
    }

    if (state.topic) {
        const topicId = Number(state.topic);
        if (!isNaN(topicId)) {
            params.topicId = topicId;
        }
    }

    if (state.level) {
        params.level = Number(state.level);
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

const fetchSpecialists = async (params: FetchSpecialistsParams) => {
    const defaultParams = {
        limit: 12,
        offset: 0
    };

    const combinedParams = { ...defaultParams, ...params };

    const searchParams = new URLSearchParams(
      Object.entries(combinedParams)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => [key, value.toString()])
    );

    const response = await fetch(`/api/search/specialists?${searchParams.toString()}`);
    return response.json();
};

export const getSpecialistsList = async (formState: FilterFormState) => {
    const params = convertStateToFetchParams(formState);
    return fetchSpecialists(params);
}
