export class ManejoMensajes {

    static handleError(message, source, lineno, colno, error) {
        const errorLog = document.getElementById('error-log');
        const customMessage = message.replace(/^Uncaught Error:/, '');
        errorLog.textContent = `${customMessage}`;
        return true; // Prevents the default browser error handling
    }

    static showSuccessMessage(msg) {
        const successLog = document.getElementById('success-log');
        successLog.textContent = msg;
        successLog.style.display = "block";
    }

    static hideSuccessMessage() {
        const successLog = document.getElementById('success-log');
        successLog.textContent = '';
        successLog.style.display = "none";
    }

    static hideErrorMessage() {
        const errorLog = document.getElementById('error-log');
        errorLog.textContent = '';
    }
}

window.onerror = ManejoMensajes.handleError.bind(this);