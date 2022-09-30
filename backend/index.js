const express = require('express')
const { default: mongoose } = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

// const pokemonRouter = require('./routes/pokemon.route.js')
// app.use('/pokemon', pokemonRouter)
// app.use('/trainers', require('./routes/trainer.route.js'))
app.use('/warehouse', require('./routes/warehouse.route.js'))

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB!')
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

connectToMongo()

app.listen(process.env.PORT || 8080, () => {
    console.log(`Listening on port ${process.env.PORT || 8080}`)
})