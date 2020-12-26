const express = require('express')
const router = express.Router()
const WKA = require('../model/wka')

router.get('/', async (req, res) => {
    try {
        const wkas = await WKA.find().countDocuments()
        res.json(wkas)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

module.exports = router