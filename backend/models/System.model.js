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
        }],
        validate: [planets => planets.length >= 1 && planets.length <= 10, 'System maximum capacity is 10 planets.']
    }
})

const System = mongoose.model('System', systemSchema, 'Systems')
module.exports = System