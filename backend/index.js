const express = require('express')
const { default: mongoose } = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/planets', require('./routes/planet.route.js'))
app.use('/systems', require('./routes/system.route.js'))

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