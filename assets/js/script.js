import { requestAllInfoGithub } from './api/ApiGithub.js';


/**
 * 
 * @param {string} valueNameId valueName del elemento a buscar
 * @returns valor del input
 */
const getValueById = (valueNameId) => {
    return document.getElementById(valueNameId).value;
}

const validarFormulario = _ => {
    const nombre = getValueById('nombre');
    const pagina = getValueById('pagina');
    const repoPagina = getValueById('repoPagina');

    if (nombre === '' || pagina === '' || repoPagina === '') {
        alert('Complete el formulario');
        return false;
    }
    return true;
}

/**
 * @description accion click button enviar
 */
document
    .getElementById('btn-github-enviar')
    .addEventListener('click', (event) => {
        event.preventDefault();
        const isValidForm = validarFormulario();
        if (isValidForm) {
            try {
                const nombre = getValueById('nombre');
                const pagina = getValueById('pagina');
                const repoPagina = getValueById('repoPagina');
                requestToGithubAndShowResult(nombre, pagina, repoPagina);
            } catch (error) {
                alert('No existe usuario');
                console.error({ error });
            }
        }
    });

const requestToGithubAndShowResult = async (nombre, pagina, repoPagina) => {
    const requestInfo = await requestAllInfoGithub(nombre, pagina, repoPagina);

    const userInfo = requestInfo[0];
    const userInfoRepo = requestInfo[1];

    const divContainer = document.getElementById('resultados');

    const htmlResult = `<div class="row">
        <div class="col-6 text-start">
            <h4>Datos de Usuario</h4>
            <p>Nombre de usuario: ${userInfo.name}</p>
            <p>Nombre de login: ${userInfo.login}</p>
            <p>Cantidad de repos: ${userInfo.public_repos}</p>
            <p>Localidad: ${userInfo.location}</p>
            <p>Organización: ${userInfo.company}</p>
        </div>
        <div class="col-6 text-end">
            <h4>Nombre de repositorios</h4>
            ${userInfoRepo.map((repoValue) => `<a href="${repoValue.html_url}">${repoValue.name}</a>`)}
        </div>
    </div>`;

    divContainer.innerHTML = htmlResult;

}