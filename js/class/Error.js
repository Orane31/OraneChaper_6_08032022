const main = document.getElementsByTagName('main')

export default class Error {

    /**
     * display error message and redirect to index page
     * @param {string} error 
     */
    static redirectIndex = (error) => {
        sessionStorage.setItem('error', error)
        window.location.href = "index.html"
    }

    /**
     * Display error message
     * @param {string} errorMsg 
     * @param {boolean} returnHome 
     */
    static print = (errorMsg, returnHome) => {


        if (returnHome) {
            main[0].innerHTML += `<div class="msg-error"><p>${errorMsg}</p><a href="index.html">Retour à l'accueil</a></div>`
        }else{
            main[0].innerHTML = `<div class="msg-error"><p>${errorMsg}</p></div>`
        }
    }
}