const express = require('express')
const router = express.Router()
const filter = require("../routes/dataFilter")
const WKA = require('../model/wka')

const projection = {
    _id: 0,
    "Leistung": { $convert: {
                    input: { $concat: [ { $substr: [ "$Leistung,N,13,3", 0, 1 ] },
                                        ".",
                                        { $substr: [ "$Leistung,N,13,3", 2, 2 ] } ] },
                    to: "double",
                    onError: "$Leistung,N,13,3"
                } },
    "Status": "$Status,C,20",
    "Genehmigt": { $concat: [ { $substr: [ "$Genehmigt,D", 6, 4 ] },
                              { $substr: [ "$Genehmigt,D", 3, 2 ] },
                              { $substr: [ "$Genehmigt,D", 0, 2 ] } ] },
    "Alt_an_anz": { $concat: [ { $substr: [ "$Alt_an_anz,D", 6, 4 ] },
                               { $substr: [ "$Alt_an_anz,D", 3, 2 ] },
                               { $substr: [ "$Alt_an_anz,D", 0, 2 ] } ] },
    "Inbetriebn": { $concat: [ { $substr: [ "$Inbetriebn,D", 6, 4 ] },
                               { $substr: [ "$Inbetriebn,D", 3, 2 ] },
                               { $substr: [ "$Inbetriebn,D", 0, 2 ] } ] },
}

function validation(power1, power2) {
    let totalpower
    let wbtotalpower

    if (typeof power1 !== "undefined") {
        if (power1._id == "in Betrieb") {
            totalpower = power1.total

            if (typeof power2 !== "undefined") {
                wbtotalpower = power2.total
            }
            else {
                wbtotalpower = 0
            }
        }
        else {
            wbtotalpower = power1.total

            if (typeof power2 !== "undefined") {
                totalpower = power2.total
            }
            else {
                totalpower = 0
            }
        }
    }
    else {
        totalpower = 0
        wbtotalpower = 0
    }

    return [totalpower, wbtotalpower]
}

async function getTotalPower(from, approved, inUse) {
    let power = await WKA.aggregate([
        {
            $project: projection
        },
        {
            $match: {
                $or: [ { $and: [ { "Inbetriebn": { $lt: from, $ne: "" } }, {"Status": inUse} ] },
                       { $and: [ { "Alt_an_anz": { $lt: from, $ne: "" } }, {"Status": inUse} ] },
                       { $and: [ { "Genehmigt": { $lt: from, $ne: "" } }, {"Status": approved} ] } ]
            }
        },
        {
            $group: { _id: "$Status",
                      total: {$sum: "$Leistung"} }
        }
    ], function (err, recs) {
        if (err) {
            console.log(err);
        } else {
            console.log('Total power complete');
        }
    })

    return power
}

router.get('/', filter.getFilter, async (req, res) => {
    let totalpower
    let wbtotalpower
    let from = res.from
    let inUse = res.inUse
    let approved = res.approved

    console.log("From: ", from)
    console.log("Approved: ", approved)
    console.log("In Use: ", inUse)

    let dataList = []
    let currentDateI = 0
    let currentDateG = 0

    try {
        let power = await getTotalPower(from, approved, inUse);
        let powerArray = validation(power[0], power[1])
        totalpower = powerArray[0]
        wbtotalpower = powerArray[1]

        console.log('Total power: ', totalpower);
        console.log('Will be total power: ', wbtotalpower);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    let wkas = res.filter
    console.log("Filter length: ", res.filter.length)

    for (let i = 0; i < res.filter.length; i++) {
        if (typeof wkas[i].Leistung === 'string') {
            wkas[i].Leistung = wkas[i].Leistung.replace(/,/g, ".")
            wkas[i].Leistung = parseFloat(wkas[i].Leistung)
        }

        if (wkas[i].Status == "in Betrieb") {
            totalpower += wkas[i].Leistung

            if (currentDateI == 0) {
                currentDateI = wkas[i].Inbetriebn
            }

            if (wkas[i].Inbetriebn != currentDateI) {
                dataList.push({Datum: currentDateI, Leistung: totalpower.toFixed(2), Status: "in Betrieb"})
                currentDateI = wkas[i].Inbetriebn
            }
        }
        else {
            wbtotalpower += wkas[i].Leistung

            if (currentDateG == 0) {
                currentDateG = wkas[i].Genehmigt
            }

            if (wkas[i].Genehmigt != currentDateG) {
                dataList.push({Datum: currentDateG, Leistung: wbtotalpower.toFixed(2), Status: "Genehmigt"})
                currentDateG = wkas[i].Genehmigt
            }
        }
    }

    dataList.sort(function(a, b){return a.Datum - b.Datum});
    res.json(dataList)
})

module.exports = router