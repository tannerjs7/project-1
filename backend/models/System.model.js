const mongoose = require('mongoose')
const Schema = mongoose.Schema

const systemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    planets: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: 'Planet'
        }]
        // validate: [planets.reduce((currSum, planet.size) => currSum + planet.size) <= 1000, 'System maximum capacity is 1000 units.']
    }
})

const System = mongoose.model('System', systemSchema, 'Systems')
module.exports = System