import {
    USER_INFO,
    USER_GET_REPOS_BY_PAGE_PER_PAGE,
} from './constants.js';

/**
 * 
 * @param {string} requestUrl 
 * @param {object} config 
 * @returns 
 */
const request = async (requestUrl, config = {}) => {
    try {
        const response = await fetch(requestUrl, config);
        const { ok } = response;

        if (!ok) {
            throw new Error('Error, en petiticion request');
        }

        return await response.json();
    } catch (error) {
        console.error({ error });
        return error;
    }
};

/**
 * 
 * @param {string} userName nombre usuario de github 
 */
export const getUser = async (userName) => {
    return await request(USER_INFO(userName));
}

/**
 * 
 * @param {string} userName nombre usuario de github
 * @param {string} page pagina
 * @param {string} perPage cantidad por pagina
 */
export const getRepo = async (userName, page, perPage) => {
    return await request(USER_GET_REPOS_BY_PAGE_PER_PAGE(userName, page, perPage));
}

/**
 * @description request to all api github
 * @param {string} userName 
 * @param {string} page 
 * @param {string} perPage 
 * @returns arreglo con ambas peticiones
 */
export const requestAllInfoGithub = async (userName, page, perPage) => {
    return await Promise
        .all([
            getUser(userName),
            getRepo(userName, page, perPage),
        ])
        .then(responses => {
            return responses;
        })
        .catch(errors => {
            console.log({ errors });
            throw new Error('Error, request all routes to github');
        })
};

