const mongoose = require('mongoose')
// data fetched from MongoDB
var wkaSchema = new mongoose.Schema({
    _id: String,
    "Betreiber,C,120": String,
    "Bst_Nr,C,11": Number,
    "Bst_Name,C,120": String,
    "Ort,C,254": String,
    "Ortsteil,C,254": String,
    "Anl_Nr,C,9": Number,
    "Anl_Bez,C,60": String,
    "Genehmigt,D": String,
    "Ostwert,N,8,0": Number,
    "Nordwert,N,7,0": Number,
    Latitude: Number,
    Longitude: Number,
    "Kreis,C,40": String,
    "Geme_Kenn,C,8": Number,
    "PLZ,C,5": Number,
    "Inbetriebn,D": String,
    "Alt_an_anz,D": String,
    "Leistung,N,13,3": String,
    "Status,C,20": String,
    "Nabenhoehe,N,11,2": Number,
    "Rotordurch,N,11,2": Number,
    "LW_TAG,N,11,2": Number,
    "LW_Nacht,N,11,2": Number,
    "Stand_Abw,N,11,2": Number,
    "Wka_ID,C,15": Number
},
{ collection : 'wka' });

module.exports = mongoose.model('WKA', wkaSchema)