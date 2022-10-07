const System = require('../models/System.model.js')

const findAllSystems = async () => await System.find()

const findSystemById = async id => {
    try {
        const system = await System.findById(id)
        if (system == null) {
            throw {status: 204, msg: `No system with the id ${id} was found.`}
        }
    } catch (err) {
        throw err
    }
}

const createSystem = async systemToSave => {
    try {
        const system = new System(systemToSave)
        await system.save()
        return system
    } catch (err) {
        throw err
    }
}

const updateSystem = async (id, systemToUpdate) => {
    try {
        await System.findByIdAndUpdate(id, systemToUpdate)
    } catch (err) {
        throw {status: 400, msg: err}
    }
}

const deleteSystemById = async id => await System.findByIdAndDelete(id)

module.exports = { findAllSystems, findSystemById, createSystem, updateSystem, deleteSystemById }