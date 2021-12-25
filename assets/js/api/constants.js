/**
 * @returns string
 */
export const BASE_URL = 'https://api.github.com';

/**
 * @description Informacion de Usuario de Github
 * @param {string} userName nombre usuario de github
 * @returns string
 */
export const USER_INFO = userName => `${BASE_URL}/users/${userName}`;

/**
 * @description Informacion de Usuario de Github con su lista de repositorios
 * @param {string} userName 
 * @param {string} page 
 * @param {string} perPage 
 * @returns string
 */
export const USER_GET_REPOS_BY_PAGE_PER_PAGE = (userName, page, perPage) => `${USER_INFO(userName)}/repos?page=${page}&per_page=${perPage}`;