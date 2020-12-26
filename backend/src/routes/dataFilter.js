const WKA = require('../model/wka')

const approvedConversion = { $concat: [ { $substr: [ "$Genehmigt,D", 6, 4 ] },
                                        { $substr: [ "$Genehmigt,D", 3, 2 ] },
                                        { $substr: [ "$Genehmigt,D", 0, 2 ] } ] }

const inUseConversion = { $cond: {
                            if: { $ne: [ "$Inbetriebn,D", "" ] },
                            then: { $concat: [ { $substr: [ "$Inbetriebn,D", 6, 4 ] },
                                               { $substr: [ "$Inbetriebn,D", 3, 2 ] },
                                               { $substr: [ "$Inbetriebn,D", 0, 2 ] } ] },
                            else: { $concat: [ { $substr: [ "$Alt_an_anz,D", 6, 4 ] },
                                               { $substr: [ "$Alt_an_anz,D", 3, 2 ] },
                                               { $substr: [ "$Alt_an_anz,D", 0, 2 ] } ] }
                        } }

const approvedDate = { $convert: {
                            input: { $concat: [ { $substr: [ "$Genehmigt,D", 6, 4 ] }, "-",
                                                { $substr: [ "$Genehmigt,D", 3, 2 ] }, "-",
                                                { $substr: [ "$Genehmigt,D", 0, 2 ] } ] },
                            to: "date",
                            onError: new Date()
                     } }

const inUseDate = { $convert: {
                        input: { $cond: {
                                    if: { $ne: [ "$Inbetriebn,D", "" ] },
                                    then: { $concat: [ { $substr: [ "$Inbetriebn,D", 6, 4 ] }, "-",
                                                       { $substr: [ "$Inbetriebn,D", 3, 2 ] }, "-",
                                                       { $substr: [ "$Inbetriebn,D", 0, 2 ] } ] },
                                    else: { $concat: [ { $substr: [ "$Alt_an_anz,D", 6, 4 ] }, "-",
                                                       { $substr: [ "$Alt_an_anz,D", 3, 2 ] }, "-",
                                                       { $substr: [ "$Alt_an_anz,D", 0, 2 ] } ] }
                               } },
                        to: "date",
                        onError: new Date()
                  } }

const projectCoordinates = {
    _id: 0,
    Wka_ID: "$Wka_ID,C,15",
    Anl_Bez: "$Anl_Bez,C,60",
    Latitude: "$Latitude",
    Longitude: "$Longitude",
    PLZ: "$PLZ,C,5",
    Status: "$Status,C,20",
    Genehmigt: approvedConversion,
    Inbetriebn: inUseConversion
}

const projectGraph1 = {
    _id: 0,
    Leistung: "$Leistung,N,13,3",
    Status: "$Status,C,20",
    Genehmigt: approvedConversion,
    Inbetriebn: inUseConversion
}

const projectGraph2 = {
    _id: 0,
    Rotordurch: "$Rotordurch,N,11,2",
    Nabenhoehe: "$Nabenhoehe,N,11,2",
    Status: "$Status,C,20",
    Genehmigt: approvedConversion,
    Inbetriebn: inUseConversion
}

const projectGraph3 = {
    _id: 0,
    PLZ: "$PLZ,C,5",
    Leistung: { $convert: {
                    input: { $concat: [ { $substr: [ "$Leistung,N,13,3", 0, 1 ] },
                             ".",
                             { $substr: [ "$Leistung,N,13,3", 2, 2 ] } ] },
                    to: "double",
                    onError: "$Leistung,N,13,3"
              } },
    Status: "$Status,C,20",
    Genehmigt: approvedConversion,
    Inbetriebn: inUseConversion
}

const projectGraph45 = {
    _id: 0,
    PLZ: "$PLZ,C,5",
    Status: "$Status,C,20",
    Genehmigt: approvedConversion,
    Inbetriebn: inUseConversion,
    Baudauer: { $divide: [{ $subtract: [inUseDate, approvedDate] }, 1000 * 60 * 60 * 24] }
}

async function choice(projection, from, to, approved, inUse) {
    let filter = await WKA.aggregate([
        {
            $project: projection
        },
        {
            $match: {
                $or: [ { $and: [ { Genehmigt: { $gte: from, $lte: to, $ne: "" } }, { Status: approved } ] },
                       { $and: [ { Inbetriebn: { $gte: from, $lte: to, $ne: "" } }, { Status: inUse } ] } ]
            }
        },
        {
            $sort: { Inbetriebn: 1, Genehmigt: 1 }
        }
    ], function (err, recs) {
        if (err) {
            console.log(err);
        } else {
            console.log('Filter complete');
        }
    })

    return filter
}

async function choice2(projection, from, to, approved, inUse) {
    let filter = await WKA.aggregate([
        {
            $project: projection
        },
        {
            $match: {
                $or: [ { $and: [ { Genehmigt: { $gte: from, $lte: to, $ne: "" } }, { Status: approved } ] },
                       { $and: [ { Inbetriebn: { $gte: from, $lte: to, $ne: "" } }, { Status: inUse } ] } ]
            }
        },
        {
            $group: {
                _id: "$PLZ",
                totalPower: { $sum: "$Leistung" },
                count: { $sum: 1 }
            }
        },
        {
            $sort: { totalPower: -1, count: -1 }
        }
    ], function (err, recs) {
        if (err) {
            console.log(err);
        } else {
            console.log('Filter complete');
        }
    })

    return filter
}

async function choice3(projection, from, to, inUse) {
    let filter = await WKA.aggregate([
        {
            $project: projection
        },
        {
            $match: {
                $and: [ { Inbetriebn: { $gte: from, $lte: to, $ne: "" } }, { Genehmigt: { $ne: "" } }, { Status: inUse } ]
            }
        },
        {
            $sort: { Baudauer: 1 }
        }
    ], function (err, recs) {
        if (err) {
            console.log(err);
        } else {
            console.log('Filter complete');
        }
    })

    return filter
}

async function choice4(projection, from, to, inUse) {
    let filter = await WKA.aggregate([
        {
            $project: projection
        },
        {
            $match: {
                $and: [ { Inbetriebn: { $gte: from, $lte: to, $ne: "" } }, { Genehmigt: { $ne: "" } }, { Status: inUse } ]
            }
        },
        {
            $group: {
                _id: "$Inbetriebn",
                Baudauer: { $avg: "$Baudauer" }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ], function (err, recs) {
        if (err) {
            console.log(err);
        } else {
            console.log('Filter complete');
        }
    })

    return filter
}

async function getFilter(req, res, next) {
    var fromList = req.query.from.split('-')
    var toList = req.query.to.split('-')
    var approved = req.query.approved
    var inUse = req.query.inUse
    const baseUrl = req.baseUrl

    var from = fromList[0] + fromList[1] + fromList[2]
    var to = toList[0] + toList[1] + toList[2]

    if (approved == "true") {
        approved = "vor Inbetriebnahme"
    }
    if (inUse == "true") {
        inUse = "in Betrieb"
    }

    res.from = from
    res.to = to
    res.inUse = inUse
    res.approved = approved

    console.log('From: ', from)
    console.log('To: ', to)
    console.log('Approved: ', approved)
    console.log('in Use: ', inUse)

    let filter
    try {
        if (baseUrl == "/coordinates") {
            filter = await choice(projectCoordinates, from, to, approved, inUse)
        } else if (baseUrl == "/graph1") {
            filter = await choice(projectGraph1, from, to, approved, inUse)
        } else if (baseUrl == "/graph2") {
            filter = await choice(projectGraph2, from, to, approved, inUse)
        } else if (baseUrl == "/graph3") {
            filter = await choice2(projectGraph3, from, to, approved, inUse)
        } else if (baseUrl == "/graph4") {
            filter = await choice3(projectGraph45, from, to, inUse)
        } else if (baseUrl == "/graph5") {
            filter = await choice4(projectGraph45, from, to, inUse)
        }
        res.filter = filter
        next()
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = { getFilter };

/*$project: {
    _id: 0,
    Betreiber: "$Betreiber,C,120",
    Bst_Nr: "$Bst_Nr,C,11",
    Bst_Name: "$Bst_Name,C,120",
    Ort: "$Ort,C,254",
    Ortsteil: "$Ortsteil,C,254",
    Anl_Nr: "$Anl_Nr,C,9",
    Anl_Bez: "$Anl_Bez,C,60",
    Latitude: "$Latitude",
    Longitude: "$Longitude",
    Kreis: "$Kreis,C,40",
    Geme_Kenn: "$Geme_Kenn,C,8",
    PLZ: "$PLZ,C,5",
    Leistung: "$Leistung,N,13,3",
    Status: "$Status,C,20",
    Nabenhoehe: "$Nabenhoehe,N,11,2",
    Rotordurch: "$Rotordurch,N,11,2",
    Genehmigt: approvedConversion,
    Inbetriebn: inUseConversion,
    Wka_ID: "$Wka_ID,C,15"
}*/