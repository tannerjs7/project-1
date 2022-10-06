const Planet = require('../models/Planet.model.js')

const findAllPlanets = async () => await Planet.find()

const findPlanetById = async id => {
    try {
        const planet = await Planet.findById(id)
        if (planet == null) {
            throw {status: 204, msg: `No planet with the id ${id} was found.`}
        }
    } catch (err) {
        throw err
    }
}

const createPlanet = async planetToSave => {
    try {
        const planet = new Planet(planetToSave)
        await planet.save()
        return planet
    } catch (err) {
        throw err
    }
}

const updatePlanet = async (id, planetToUpdate) => {
    try {
        await Planet.findByIdAndUpdate(id, planetToUpdate)
    } catch (err) {
        throw {status: 400, msg: err}
    }
}

const deletePlanetById = async id => await Planet.findByIdAndDelete(id)

module.exports = { findAllPlanets, findPlanetById, createPlanet, updatePlanet, deletePlanetById }