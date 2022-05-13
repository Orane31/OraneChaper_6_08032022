export default class Tag {
    constructor (value) {
        this.value = value
        this.state = false

        this.element = document.createElement('li')
        this.element.setAttribute('class', 'tag-item')
        this.element.setAttribute('data-active', this.state)
        this.element.setAttribute('data-value', this.value)
        this.element.setAttribute('role', "button")
        this.element.setAttribute('aria-label', `filtre ${this.value}, désactivé`)
        this.element.innerHTML = `<a href="#">${this.value}</a>`

        this.element.addEventListener('click', (e) => {
            e.preventDefault()
            this.setState()
            Tag.callback()
        })

        Tag.instances = [...Tag.instances, this]
    }

    static instances = []
    static activeTags = []
    static oneAtTime = false
    static callback = null

    /**
     * filter tags
     * @param {string} config 
     */
    static config = (config) => {
        for (const [key, value] of Object.entries(config)) {
            switch (key) {
                case 'oneAtTime':
                    Tag.oneAtTime = value
                    break;
                case 'callback':
                    Tag.callback = value
                    break;
                default:
                    break;
            }
        }
    }

    /**
     * Update filter tag state : selected / disabled
     */
    setState = () => {

        if (Tag.oneAtTime && Tag.activeTags[0] != this.value) {
            Tag.activeTags = []
            Tag.instances.forEach(tag => tag.state = false)
        }
        
        if (!this.state) {
            Tag.activeTags = [...Tag.activeTags, this.value]
        } else {
            let index = Tag.activeTags.indexOf(this.value)
            Tag.activeTags.splice(index, 1)
        }

        Tag.instances.forEach(tag => {
            if (Tag.activeTags.includes(tag.value)) {
                tag.state = true
                tag.element.setAttribute('data-active', 'true')
                tag.element.setAttribute('aria-label', `filtre ${tag.value}, activé`)
            } else {
                tag.state = false
                tag.element.setAttribute('data-active', 'false')
                tag.element.setAttribute('aria-label', `filtre ${tag.value}, désactivé`)
            }
        })
    } 
}