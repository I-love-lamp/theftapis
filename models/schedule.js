var mongoose = require('mongoose');

var scheduleSchema = new mongoose.Schema({

    theftId: String,
    contactHrs: String,
    visitDate: String,
    officerName: String,
    notes: String,
    visitConfirmed: Boolean(false),
    updated: {
        type: Date,
        default: Date.now }
});

module.exports = mongoose.model('Schedule', scheduleSchema);