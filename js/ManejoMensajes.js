export class ManejoMensajes {

    /**
     * Permite manejar los errores generados por el sistema, mostrandolos adecuandamente en pantalla
     * @param {*} message mensaje de error
     * @param {*} source origen del error
     * @param {*} lineno 
     * @param {*} colno 
     * @param {*} error 
     * @returns true si se desea que se muestren los mensajes de error en depuración
     */
    static handleError(message, source, lineno, colno, error) {
        const errorLog = document.getElementById('error-log');
        const customMessage = message.replace(/^Uncaught Error:/, '');
        errorLog.textContent = `${customMessage}`;
        return true;
    }

    /**
     * muestra un mensaje exitoso   
     * @param {*} msg mensaje que se desea visualizar
     */
    static showSuccessMessage(msg) {
        const successLog = document.getElementById('success-log');
        successLog.textContent = msg;
        successLog.style.display = "block";
    }

    /**
     * Esconde los mensajes exitosos
     */
    static hideSuccessMessage() {
        const successLog = document.getElementById('success-log');
        successLog.textContent = '';
        successLog.style.display = "none";
    }

    /**
     * Esconde los mensajes de error
     */
    static hideErrorMessage() {
        const errorLog = document.getElementById('error-log');
        errorLog.textContent = '';
    }
}

/**
 * Asocia el manejo de errores a los errores por defecto del sistema
 */
window.onerror = ManejoMensajes.handleError.bind(this);