const mongoose = require('mongoose')
const Schema = mongoose.Schema

const systemSchema = new Schema({
    planets: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: 'Planet'
        }],
        validate: [planets => planets.length >= 0 && planets.length <= 10, 'System maximum capacity is 10 planets.']
    }
})

const System = mongoose.model('System', systemSchema, 'Systems')
module.exports = System