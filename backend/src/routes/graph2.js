const express = require('express')
const router = express.Router()
const filter = require("../routes/dataFilter")

function makeArray(arr) {
    let result = [], counter = 1, nextR, nextN;

    for ( var i = 0; i < arr.length; i++ ) {
        if (typeof arr[i + 1] !== "undefined") {
        	nextR = arr[i + 1].Rotordurch;
        	nextN = arr[i + 1].Nabenhoehe;
        }
        else {
        	nextR = -1;
        	nextN = -1;
        }

        if ( arr[i].Rotordurch !== nextR || arr[i].Nabenhoehe !== nextN) {
        		result.push({Rotordurch: arr[i].Rotordurch, Nabenhoehe: arr[i].Nabenhoehe, Anzahl: counter});
        		counter = 1;
        } else {
            counter++;
        }
    }

    return result;
}

router.get('/', filter.getFilter, async (req, res) => {
    let goodWkas = []

    let wkas = res.filter
    for (let i = 0; i < res.filter.length; i++) {
        if (typeof wkas[i].Nabenhoehe === 'string') {
            wkas[i].Nabenhoehe = wkas[i].Nabenhoehe.replace(/,/g, ".")
            wkas[i].Nabenhoehe = parseFloat(wkas[i].Nabenhoehe)
        }

        if (typeof wkas[i].Rotordurch === 'string') {
            wkas[i].Rotordurch = wkas[i].Rotordurch.replace(/,/g, ".")
            wkas[i].Rotordurch = parseFloat(wkas[i].Rotordurch)
        }

        if (wkas[i].Nabenhoehe > 0 && wkas[i].Rotordurch > 0) {
            goodWkas.push({ Rotordurch: wkas[i].Rotordurch, Nabenhoehe: wkas[i].Nabenhoehe })
        }
    }

    goodWkas.sort(function(a, b){return a.Rotordurch - b.Rotordurch || a.Nabenhoehe - b.Nabenhoehe});

    res.json(makeArray(goodWkas))
})

module.exports = router