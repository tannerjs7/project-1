const mongoose = require('mongoose')
const Schema = mongoose.Schema

const planetSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['pluto', 'mercury', 'mars', 'venus', 'earth']
    },
    size: {
        type: Number,
        required: true
    },
    info: String,
    isReal: Boolean,
    imageUrl: String
})

const Planet = mongoose.model('Planet', planetSchema, 'Planets')

module.exports = Planet