const mongoose = require('mongoose')
const Schema = mongoose.Schema

const planetSchema = new Schema({

    name: {
        type: String,
        required: true,
        enum: ['pluto', 'mercury', 'mars', 'venus', 'earth']
        // validate: planetName =>// [pokemonTeam => pokemonTeam.length <= 6 && pokemonTeam.length >= 1, 'Team size must be between 1 and 6']
        //             planetName === 'pluto' ||
        //             planetName === 'mercury' ||
        //             planetName === 'mars' ||
        //             planetName === 'venus' ||
        //             planetName === 'earth' ||
        //             planetName === 'neptune' ||
        //             planetName === 'uranus' ||
        //             planetName === 'saturn' ||
        //             planetName === 'jupiter',
        //             'Must be the name of a planet in our solar system.'
    },
    size: {
        type: Number,
        validate: 

})

const Planet = mongoose.model('Planet', planetSchema, 'Planets')

module.exports = Planet