const express = require('express')
const router = express.Router()
const WKA = require('../model/wka')

const inUse = { $cond: {
                    if: { $ne: [ "$Inbetriebn,D", "" ] },
                    then: "$Inbetriebn,D",
                    else: "$Alt_an_anz,D"
              } }

const projection = {
    _id: 0,
    Betreiber: "$Betreiber,C,120",
    Betriebsstättennummer: "$Bst_Nr,C,11",
    Betriebsbezeichnung : "$Bst_Name,C,120",
    Ort: "$Ort,C,254",
    Ortsteil: { $cond: {
                    if: { $ne: [ "$Ortsteil,C,254", "" ] },
                    then: "$Ortsteil,C,254",
                    else: "keine Angabe"
              } },
    Anlagennummer: "$Anl_Nr,C,9",
    Anlagebezeichnung: "$Anl_Bez,C,60",
    Kreis: "$Kreis,C,40",
    Gemeindeschlüssel : "$Geme_Kenn,C,8",
    Postleitzahl: "$PLZ,C,5",
    Leistung: { $concat: [ { $toString: "$Leistung,N,13,3" }, " MW" ] },
    Status: "$Status,C,20",
    Nabenhöhe: { $concat: [ { $toString: "$Nabenhoehe,N,11,2" }, " m" ] },
    Rotordurchmesser: { $concat: [ { $toString: "$Rotordurch,N,11,2" }, " m" ] },
    Genehmigungsdatum: { $cond: {
                            if: { $ne: [ "$Genehmigt,D", "" ] },
                            then: "$Genehmigt,D",
                            else: "nicht genehmigt"
                       } },
    Inbetriebnahmedatum: { $cond: {
                            if: { $ne: [ inUse, "" ] },
                            then: inUse,
                            else: "nicht in Betrieb"
                         } },
    Wka_ID: "$Wka_ID,C,15"
}

router.get('/', async (req, res) => {
    const wkaId = req.query.wkaId
    console.log("WkaID: ", wkaId)

    let wka = await WKA.aggregate([
        {
            $project: projection
        },
        {
            $match: { Wka_ID: Number(wkaId) }
        }
    ], function (err, recs) {
        if (err) {
            console.log(err);
        } else {
            console.log('getById complete');
        }
    })
    // let wka = await WKA.findOne({ "Wka_ID,C,15": wkaId }).lean()

    res.json(wka)
})

module.exports = router