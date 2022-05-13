import Error from './Error.js'


export default class Api {

    static photographers
    static medias

    /**
     * Get data from json file and store in variables
     */
    static init = async () => {
            const req = await fetch('./FishEyeData.json')
            if (!req.ok) {
                throw "Données momentanément indisponible"
            }
            const data =  await req.json()

            Api.photographers = data.photographers
            Api.medias = data.media        
    }

    /**
     * Get all photographers
     * @returns {object}
     */
    static getAllPhotographers = () => {
        return Api.photographers
    }

    /**
     * Get photographer infos with id
     * @param {number} id 
     * @returns {object}
     */
    static getPhotographerById = (id) => {
        id = parseInt(id, 10)

        if (!isNaN(id)) {
            const res = Api.photographers.find(photographer => photographer.id === id)
            return res || Error.print("Ce photographe n'existe pas", true)
        }
    }

    /**
     * Get all tags
     * @returns {array}
     */
    static getAllTags = () => {
        let allTags = []

        Api.photographers.forEach(photographer => {
            let tagsPhotographer = photographer.tags
            
            tagsPhotographer.forEach(tag => {
                if (!allTags.includes(tag)) {
                    allTags = [...allTags, tag]
                }
            })
        })

        return allTags
    }

    /**
     * Get all medias for photographer with id
     * @param {number} id 
     * @returns 
     */
    static getMediaFromPhotographer = (id) => {
        return Api.medias.filter(media => media.photographerId == id)
    }
}