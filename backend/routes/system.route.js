const { default: mongoose } = require('mongoose')
const router = require('express').Router()
const { findAllSystems, findSystemById, createSystem, updateSystem, deleteSystemById } = require('../controllers/system.controller.js')

const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(204).send()
    } else {
        next()
    }
}

router.get('/', async (req, res) => {
    try {
        const systems = await findAllSystems()
        res.json(systems)
    } catch (err) {
        res.status(err?.status ?? 500).json(err)
    }
})

router.get('/:id', validateObjectId, async (req, res) => {
    try {
        const system = await findSystemById(req.params.id)
        res.json(system)
    } catch (err) {
        res.status(err?.status ?? 500).json(err)
    }
})

router.post('/', async (req, res) => {
    try {
        const system = await createSystem(req.body)
        res.status(201).json(system)
    } catch (err) {
        res.status(err?.status ?? 500).json(err)
    }
})

router.put('/:id', validateObjectId, async (req, res) => {
    try {
        await updateSystem(req.params.id, req.body)
        res.send()
    } catch {
        res.status(err?.status ?? 500).json(err)
    }
})

router.delete('/:id', validateObjectId, async (req, res) => {
    try {
        await deleteSystemById(req.params.id)
        res.send()
    } catch (err) {
        res.status(err?.status ?? 500).json(err)
    }
})

module.exports = router