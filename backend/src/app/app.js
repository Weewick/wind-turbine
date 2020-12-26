const express = require("express");
const app = express();
const mongoose = require("mongoose");
const WKA = require("../model/wka");
require('dotenv').config();

mongoose.connect(process.env.DB_CONNECTION_STRING, {useUnifiedTopology: true,useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const countRouter = require('../routes/count')
app.use('/count', countRouter)

const coordinatesRouter = require('../routes/coordinates')
app.use('/coordinates', coordinatesRouter)

const getByIdRouter = require('../routes/getById')
app.use('/getById', getByIdRouter)

const graph1Router = require('../routes/graph1')
app.use('/graph1', graph1Router)

const graph2Router = require('../routes/graph2')
app.use('/graph2', graph2Router)

const graph3Router = require('../routes/graph3')
app.use('/graph3', graph3Router)

const graph4Router = require('../routes/graph4')
app.use('/graph4', graph4Router)

const graph5Router = require('../routes/graph5')
app.use('/graph5', graph5Router)

//Test auf Fehlerhaftes Datum
app.get('/dates_g', async (req, res) => {
    try {
        const wkas = await WKA.find({ "Genehmigt,D" : "", "Alt_an_anz,D" : "" }).select('-_id Status,C,20').lean()
        res.json(wkas)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

app.get('/dates_i', async (req, res) => {
    try {
        const wkas = await WKA.find({ "Inbetriebn,D" : "", "Genehmigt,D" : { $ne: "" }, "Alt_an_anz,D" : "" }).select('-_id Status,C,20').lean()
        res.json(wkas)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

app.get('/dates_a', async (req, res) => {
    try {
        const wkas = await WKA.find({ "Alt_an_anz,D" : { $ne: "" } }).select('-_id Status,C,20').lean()
        res.json(wkas)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

app.listen(process.env.PORT, () => console.log('Server Started'));

module.exports = app