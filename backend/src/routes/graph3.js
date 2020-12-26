const express = require('express')
const router = express.Router()
const filter = require("../routes/dataFilter")

router.get('/', filter.getFilter, async (req, res) => {
    let wkas = res.filter
    let topPowerCount = []
    let length

    if (res.filter.length < 10) {
        length = res.filter.length
    }
    else {
        length = 10
    }

    for (let i = 0; i < length; i++) {
        topPowerCount.push({PLZ: wkas[i]._id.toString(), Leistung: wkas[i].totalPower, Anzahl: 0})
    }

    wkas.sort(function(a, b){return b.count - a.count});

    for (let i = 0; i < length; i++) {
        if (topPowerCount[i].PLZ !== wkas[i]._id.toString()) {
            topPowerCount[i].PLZ += "/ " + wkas[i]._id
        }
        topPowerCount[i].Anzahl = wkas[i].count
    }

    res.json(topPowerCount)
})

module.exports = router