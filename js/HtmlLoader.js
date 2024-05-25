export class HtmlLoader {
    /**
     * Carga un html dentro de un elemento del html
     * @param {*} elementId Elemento del html donde se desea cargar el html
     * @param {*} url Dirección del html que se desea cargar en el elemento
     */
    static loadHTML(elementId, url) {
        fetch(url)
            .then(response => response.text())
            .then(data => document.querySelector(elementId).innerHTML = data)
            .catch(error => console.error('Error cargando el archivo:', error));
    }
}

/**
 * Carga el header y footer del html
 */
document.addEventListener("DOMContentLoaded", function () {
    HtmlLoader.loadHTML('header', 'header.html');
    HtmlLoader.loadHTML('footer', 'footer.html');
});
