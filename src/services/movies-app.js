import axios from "axios";
import {transform} from './transform'

const refs = {
    baseURL: process.env.REACT_APP_BASE_URL,
    pathPop: process.env.REACT_APP_PATHNAME_MUST_POP_MOVIES,
    pathSearch: process.env.REACT_APP_PATHNAME_SEARCH_MOVIES,
    pathMov: process.env.REACT_APP_PATHNAME_MOVIES,
    key: process.env.REACT_APP_API_KEY
};

export const services = {

    fetchPopMovies: async () => {
        const {
            baseURL,
            pathPop,
            key
        } = refs;

        try {
            const data = await axios.get(
                `${baseURL}${pathPop}?api_key=${key}`
            );
            return  transform.forCard(data.data.results);
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },

    fetchSearchMovies: async (page = 1, query) => {
        const {
            baseURL,
            pathSearch,
            key
        } = refs;

        try {
            const data = await axios.get(
                `${baseURL}${pathSearch}?api_key=${key}&language=ru-RU&query=${query}&page=${page}`
            );
            return transform.forCard(data.data.results);
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }

    },

    fetchMoviesInfo: async (id) => {
        const {
            baseURL,
            pathMov,
            key
        } = refs;

        let currentId;

        if (id) {
            currentId = id;
            refs.currentId = currentId;
        }

        try {
            const data = await axios.get(
                `${baseURL}${pathMov}${currentId}?api_key=${key}&language=ru-RU`
            );
            return transform.forDetailsPage(data.data);
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },

    fetchCast: async () => {
        const {
            baseURL,
            pathMov,
            currentId,
            key
        } = refs;

        try {
            const data = await axios.get(
                `${baseURL}${pathMov}${currentId}/credits?api_key=${key}`
            );
            return transform.forCast(data.data.cast);
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },

    fetchReviews: async () => {
        const {
            baseURL,
            pathMov,
            currentId,
            key
        } = refs;

        try {
            const data = await axios.get(
                `${baseURL}${pathMov}${currentId}/reviews?api_key=${key}&language=en-US&page=1`
            );
            return data.data.results;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}