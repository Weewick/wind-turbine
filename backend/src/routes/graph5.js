const express = require('express')
const router = express.Router()
const filter = require("../routes/dataFilter")

router.get('/', filter.getFilter, async (req, res) => {
    let wkas = res.filter
    let buildTimeList = []

    for (let i = 0; i < res.filter.length; i++) {
        if (wkas[i].Baudauer > 0) {
            buildTimeList.push({Datum: wkas[i]._id, Baudauer: wkas[i].Baudauer})
        }
    }

    res.json(buildTimeList)
})

module.exports = router