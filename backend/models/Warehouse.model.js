const mongoose = require('mongoose')
const Schema = mongoose.Schema

const warehouseSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    space: {
        type: Number,
        required: true
    },
    planets: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: 'Planets' // Might need to be singular
        }],
        validate: [pokemonTeam => pokemonTeam.length <= 6 && pokemonTeam.length >= 1, 'Team size must be between 1 and 6']
    }

})

const Warehouse = mongoose.model('Warehouse', warehouseSchema, 'Warehouses')

module.exports = Warehouse