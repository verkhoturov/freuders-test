
const API = import.meta.env.VITE_BACKEND_API_URL;

export const fetchSpecialists = async (params: string) => {
    const response = await fetch(`${API}/search/specialists?limit=12&offset=0`);
    return response.json();
};