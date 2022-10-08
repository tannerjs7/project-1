const mongoose = require('mongoose')
const Schema = mongoose.Schema

const planetSchema = new Schema({
    name: {
        type: String,
        required: true,
        // enum: ['pluto', 'mercury', 'mars', 'venus', 'earth']
    },
    size: {
        type: Number,
        required: true,
        min: [1, 'A planet must occupy at least 1 unit of space.'],
        max: [1000, 'A planet can be no larger than 1000 units.']
    },
    info: String,
    isReal: Boolean,
    imageUrl: String
})

const Planet = mongoose.model('Planet', planetSchema, 'Planets')

module.exports = Planet