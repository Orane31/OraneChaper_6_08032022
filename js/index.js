import Api from './class/Api.js'
import Error from './class/Error.js'
import Tag from './class/Tag.js'
import Photographer from './class/Photographer.js'


let tagTarget = document.getElementById('tags')
let photographerTarget = document.getElementById('photographers-list')


const injectElement = (element, target) => {
    target.appendChild(element)
}


try {
    await Api.init()
} catch (error) {
    Error.print(error)
}

// Tags

    Tag.config({
        oneAtTime: false,
        callback: () => { Photographer.setVisbilityFromFilters() }
    })

    Api.getAllTags().forEach(tag => new Tag(tag))

    Tag.instances.forEach(i => {
        injectElement(i.element, tagTarget)
    })


// Photographers

    Api.getAllPhotographers().forEach(p => new Photographer(p))

    Photographer.instances.forEach(i => {
        injectElement(i.element, photographerTarget)
    })