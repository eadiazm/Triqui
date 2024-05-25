export class HtmlLoader{
    static loadHTML(elementId, url) {
        fetch(url)
            .then(response => response.text())
            .then(data => document.querySelector(elementId).innerHTML = data)
            .catch(error => console.error('Error cargando el archivo:', error));
    }
}

document.addEventListener("DOMContentLoaded", function() {
    HtmlLoader.loadHTML('header', 'header.html');
    HtmlLoader.loadHTML('footer', 'footer.html');
});
