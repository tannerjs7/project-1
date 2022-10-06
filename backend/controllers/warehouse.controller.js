const Warehouse = require('../models/Warehouse.model.js')

const findAllWarehouses = async () => await Warehouse.find()

const findWarehouseById = async id => {

}

const createWarehouse = async warehouseToSave => {

}

const updateWarehouse = async (id, warehouseToUpdate) => {

}

const deleteWarehouseById = async id => await Warehouse.findByIdAndDelete(id)

module.exports = { findAllWarehouses, findWarehouseById, createWarehouse, updateWarehouse, deleteWarehouseById }