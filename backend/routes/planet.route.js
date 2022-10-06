const { default: mongoose } = require('mongoose')
const router = require('express').Router()
const { findAllPlanets, findPlanetById, createPlanet, updatePlanet, deletePlanetById } = require('../controllers/planet.controller.js')

const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(204).send()
    } else {
        next()
    }
}

router.get('/', async (req, res) => {
    const planet = await findAllPlanets()
    res.json(planet)
})

router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw {status: 204, msg: 'No planet found'}
        }
        const planet = await findPlanetById(req.params.id)
        res.json(planet)
    } catch (err) {
        console.log(err)
        res.status(err?.status).json(err)
    }
})

router.post('/', async (req, res) => {
    try {
        const planet = await createPlanet(req.body)
        res.status(201).json(planet)
    } catch (err) {
        res.status(err?.status ?? 500).json(err)
    }
})

router.put('/:id', async (req, res) => {
    try {
        await updatePlanet(req.params.id, req.body)
        res.send()
    } catch {
        res.status(err?.status ?? 500).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await deletePlanetById(req.params.id)
        res.send()
    } catch (err) {
        res.status(err?.status ?? 500).json(err)
    }
})

module.exports = router