export class HtmlTools{
    static CreateParagraph(text){        
        var newParagraph = document.createElement("p")
        newParagraph.innerHTML = text
        return newParagraph
    }

    static InsertText(element, texto){     
        var elem = document.getElementById(element)
        elem.innerHTML = texto
    }
    
    static CreateListElement(list, text){     
        var list = document.getElementById(list)   
        var listElem = document.createElement("li")
        listElem.innerHTML = text
        list.appendChild(listElem)
    }
    
    static ClearListElement(list){     
        var list = document.getElementById(list)   
        list.innerHTML = ""
    }
    
    static CreateSelectOption(selectId, optionText){
        const select = document.getElementById(selectId);
        if (select) {
            const option = document.createElement('option');
            option.text = optionText;
            select.add(option);
        }
    }
}