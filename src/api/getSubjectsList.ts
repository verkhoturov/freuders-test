import { Subject } from '../types';

interface FetchResponse {
    data: Subject[];
}

export const getSubjectsList = async () => {
    try {
        const response = await fetch(`/api/subjects`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.Message);
        }

        const { data }: FetchResponse = await response.json();

        return { list: data };
    } catch (error) {
        console.error(error);
    }
};
