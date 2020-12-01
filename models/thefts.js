var mongoose = require('mongoose');

var theftSchema = new mongoose.Schema({
    name: String,
    gender: String,
    stolenItem: String,
    itemDescr: String,
    estValue: Number,
    photoUrl: String,
    homeLat: Number,
    homeLong: Number,
    homeAddr1: String,
    homeAddr2: String,
    homeCity: String,
    homeCounty: String,
    homeCountry: String,
    stolenOutsideHome: Boolean(false),
    theftAddr1: String,
    theftAddr2: String,
    theftCity: String,
    theftCounty: String,
    theftCountry: String,
    theftDate: Date,
    theftTime: String,
    visit: {
        contactHrs: String,
        visitDate: String,
        officerName: String,
        notes: String,
        visitConfirmed: Boolean(false),
    },
    userId: String,
    emailAddr: String,
    reportStatus: String,
    updated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Theft', theftSchema);