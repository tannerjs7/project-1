const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Use Mongoose to create a planet schema for MongoDB.

const planetSchema = new Schema({

    // Name of the planet.
    name: {
        type: String,
        required: true,
    },

    // Size of the planet.
    size: {
        type: Number,
        required: true,
        // Planet size must be between 1 and 1000 units.
        min: [1, 'A planet must occupy at least 1 unit of space.'],
        max: [1000, 'A planet can be no larger than 1000 units.']
    },

    // Information regarding the planet.
    info: String,

    // Whether or not the planet is real.
    isReal: Boolean,

    // A link to an image of the planet.
    imageUrl: String,

    // The system to which the planet belongs.
    system: String
})

const Planet = mongoose.model('Planet', planetSchema, 'Planets')

module.exports = Planet