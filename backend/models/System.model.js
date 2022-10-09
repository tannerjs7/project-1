const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Use Mongoose to create a system schema for MongoDB.

const systemSchema = new Schema({

    // Along with the _id property assigned by MongoDB, each system is only defined by the planets it holds.
    planets: {
        // Holds planet IDs.
        type: [{
            type: mongoose.Types.ObjectId,
            ref: 'Planet'
        }],
        // Each system can hold up to 10 planets.
        validate: [planets => planets.length <= 10, 'System maximum capacity is 10 planets.']
    }
})

const System = mongoose.model('System', systemSchema, 'Systems')
module.exports = System