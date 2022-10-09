const { default: mongoose } = require('mongoose')
const router = require('express').Router()
const { findAllPlanets, findPlanetById, createPlanet, updatePlanet, deletePlanetById } = require('../controllers/planet.controller.js')

// Middleware to validate planet IDs.
const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(204).send()
    } else {
        next()
    }
}

// Read all planets.
router.get('/', async (req, res) => {
    try {
        const planets = await findAllPlanets()
        res.json(planets)
    } catch (err) {
        res.status(err?.status ?? 500).json(err)
    }
})

// Read a specific planet.
router.get('/:id', validateObjectId, async (req, res) => {
    try {
        const planet = await findPlanetById(req.params.id)
        res.json(planet)
    } catch (err) {
        res.status(err?.status ?? 500).json(err)
    }
})

// Create a new planet.
router.post('/', async (req, res) => {
    try {
        const planet = await createPlanet(req.body)
        res.status(201).json(planet)
    } catch (err) {
        res.status(err?.status ?? 500).json(err)
    }
})

// Update a planet.
router.put('/:id', validateObjectId, async (req, res) => {
    try {
        await updatePlanet(req.params.id, req.body)
        res.send()
    } catch (err) {
        res.status(err?.status ?? 500).json(err)
    }
})

// Delete a planet.
router.delete('/:id', validateObjectId, async (req, res) => {
    try {
        await deletePlanetById(req.params.id)
        res.send()
    } catch (err) {
        res.status(err?.status ?? 500).json(err)
    }
})

module.exports = router