import Media from "./Media.js"

export default class SortDropDown {
    constructor () {
        this.item = {
            popularity : "Popularité",
            date : "Date",
            title : "Titre"
        }
        this.defaultBtnValue = "Popularité"
        this.state = false
    }

    static value = "popularity"

    /**
     * Display media filter functtion
     * @returns {HTMLElement} HTMLElement
     */
    getView = () => {
        // Création des éléments
        let sortView = document.createElement('div')
        sortView.setAttribute('class', 'sort')

        let sortLabel = document.createElement('span')
        sortLabel.setAttribute('id', 'sort-label')
        sortLabel.setAttribute('class', 'sort__label')
        sortLabel.innerHTML = "Trier par"

        let sortWrapper = document.createElement('div')
        sortWrapper.setAttribute('id', 'sort-wrapper')
        sortWrapper.setAttribute('class', 'sort__wrapper')
        this.wrapper = sortWrapper

        let sortBtn = document.createElement('button')
        sortBtn.setAttribute('id', 'sort-btn')
        sortBtn.setAttribute('class', 'btn sort-btn')
        sortBtn.setAttribute('aria-expanded', 'false')
        sortBtn.setAttribute('aria-haspopup', 'listbox')
        sortBtn.setAttribute('labelledby', 'sort-label')
        sortBtn.innerHTML = this.defaultBtnValue
        this.btn = sortBtn
        sortBtn.addEventListener('click', this.toggleDropDown)

        let sortList = this.getSortList()
        this.list = sortList

        // Création de l'arborescence
        sortWrapper.appendChild(sortBtn)
        sortWrapper.appendChild(sortList)

        sortView.appendChild(sortLabel)
        sortView.appendChild(sortWrapper)

        return sortView
    }

    /**
     * Display filters list
     * @returns {HTMLElement} HTMLElement
     */
    getSortList = () => {

        let sortList = document.createElement('ul')
        sortList.setAttribute('id', 'sort-list')
        sortList.setAttribute('class', 'sort-list')
        sortList.setAttribute('role', 'listbox')
        sortList.setAttribute('aria-activedescendant', 'popularity')
        sortList.setAttribute('aria-selected', 'true')
        sortList.setAttribute('aria-labelledby', 'sort-label')

        for (const [key, value] of Object.entries(this.item)) {
            let sortItem = document.createElement('li')
            sortItem.setAttribute('id', value)
            sortItem.setAttribute('class', 'sort-list__item')
            sortItem.setAttribute('data-value', key)
            sortItem.setAttribute('tabindex', '0')
            sortItem.setAttribute('role', 'button')
            sortItem.innerHTML = value

            sortItem.addEventListener('click', this.updateState)
            sortItem.addEventListener('keydown', (e) => { e.key === 'Enter' && this.updateState(e)})

            sortList.appendChild(sortItem)
        }

        return sortList
    }

    /**
     * Update filters state
     * @param {PointerEvent} e 
     */
    updateState = (e) => {
        e.preventDefault()
        this.toggleDropDown()
        let newState = e.target.getAttribute('data-value')

        if(newState != SortDropDown.value){
            SortDropDown.value = newState
            this.btnValue = newState
            this.list.setAttribute('aria-activedescendant', newState)
            this.btn.innerHTML = this.item[newState]
            Media.sortBy(newState)
        }
    }

    /**
     * Close / open dropdown filter
     */
    toggleDropDown = () => {

        if (this.state) {
            this.state = false
            this.btn.setAttribute('aria-expanded', 'false')
            this.wrapper.classList.remove('open')
            this.list.style.display = "none"
            document.removeEventListener('click', this.clickOut)
        }else{
            this.state = true
            this.btn.setAttribute('aria-expanded', 'true')
            this.wrapper.classList.add('open')
            this.list.style.display = "block"
            document.addEventListener('click', this.clickOut)
        }
    }

    /**
     * check if click event
     * @param {PointerEvent} e 
     */
    clickOut = (e) => {
        if (!e.target.classList.contains('sort-btn') &&
            !e.target.classList.contains('sort-list')) {
            this.toggleDropDown()
        }
    }
}