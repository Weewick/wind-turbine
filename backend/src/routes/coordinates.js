const express = require('express')
const router = express.Router()
const filter = require("../routes/dataFilter")

router.get('/', filter.getFilter, async (req, res) => {
    let wkas = res.filter
    res.json(wkas)
})

module.exports = router