import Api from './class/Api.js'
import Tag from './class/Tag.js'
import Error from './class/Error.js'
import Photographer from './class/Photographer.js'
import SortDropDown from './class/SortDropDown.js'
import Media from './class/Media.js'
import CardInfos from './class/CardInfos.js'
import FormContact from './class/FormContact.js'


const photographerTarget = document.getElementById('photographer-profil')
const sortTarget = document.getElementById('sort')
const mediaTarget = document.getElementById('gallery')
const cardInfosTarget = document.getElementById('card-infos')


const injectElement = (element, target) => {
    if (element.id == target.id) {
        target.parentNode.replaceChild(element, target)
    } else {
        target.appendChild(element)
    }
}

const getParam = (param) => {
    let search = window.location.search
    let result = new URLSearchParams(search).get(param)

    if (result != null) {
        return result
    }

    return false
}


try {
    await Api.init()
} catch (error) {
    Error.print(error, true)
}


Tag.config({
    oneAtTime: true,
    callback: () => { Media.setVisbilityFromFilters() }
})

// Photographers

    // Get photographer id
    const photographerId = getParam('id')

    // Create elements
    let photographer = new Photographer(Api.getPhotographerById(photographerId))

    // display in html
    Photographer.instances.forEach(i => {
        injectElement(i.element, photographerTarget)
    })

// Sort by

    const sort = new SortDropDown()

    injectElement(sort.getView(), sortTarget)

// Media gallery

    // Get photographe medias
    const medias = Api.getMediaFromPhotographer(photographerId)

    medias.forEach(media => new Media(media, mediaTarget))

    Media.sortBy(SortDropDown.value)

// Photographer info card total likes & price

    const cardInfos = new CardInfos(photographer.price)

    injectElement(cardInfos.getView(), cardInfosTarget)


    FormContact.init()