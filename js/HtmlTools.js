export class HtmlTools {
    /**
     * Crea un elemento p en el html
     */
    static CreateParagraph(text) {
        var newParagraph = document.createElement("p")
        newParagraph.innerHTML = text
        return newParagraph
    }

    /**
     * Agrega texto a un elemento del html
     * @param {*} element Elemento del html al que se desea agregar texto
     * @param {*} texto Texto que se desea agregar el elemento
     */
    static InsertText(element, texto) {
        var elem = document.getElementById(element)
        elem.innerHTML = texto
    }

    /**
     * Agrega nuevos elementos a una lista del html
     * @param {*} list Lista a la que se desea agregar elementos
     * @param {*} text Texto que se agrega a la lista
     */
    static CreateListElement(list, text) {
        var list = document.getElementById(list)
        var listElem = document.createElement("li")
        listElem.innerHTML = text
        list.appendChild(listElem)
    }

    /**
     * Elimina todos los elementos de una lista dentro del html
     * @param {*} list Lista que se desea limpiar
     */
    static ClearListElement(list) {
        var list = document.getElementById(list)
        list.innerHTML = ""
    }

    /**
     * Crea una nueva opción en un objeto select del html
     * @param {*} selectId Identificador de la opción
     * @param {*} optionText Texto de la opción
     */
    static CreateSelectOption(selectId, optionText) {
        const select = document.getElementById(selectId);
        if (select) {
            const option = document.createElement('option');
            option.text = optionText;
            select.add(option);
        }
    }
}