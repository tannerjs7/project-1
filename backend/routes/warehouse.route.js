const { default: mongoose } = require('mongoose')

const router = require('express').Router()
const { findAllWarehouses, findWarehouseById, createWarehouse, updateWarehouse, deleteWarehouseById } = require('../controllers/warehouse.controller.js')

const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(204).send()
    } else {
        next()
    }
}

router.get('/', async (req, res) => {
    const warehouse = await findAllWarehouses()
    res.json(warehouse)
})

router.get('/:id', async (req, res) => {

})

router.post('/:id', async (req, res) => {

})

router.put('/:id', async (req, res) => {

})

router.delete('/:id', async (req, res) => {

})

module.exports = router