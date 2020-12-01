'use strict';
// jscs:disable

var _ = require('lodash');
var Schedule = require('../models/schedule.js');

module.exports = function (app) {

    /* Create */
    app.post('/schedule', function (req, res) {
        var newSchedule = new Schedule(req.body);
        newSchedule.save(function (err) {
            if (err) {
                res.json({info: 'error during schedule create', error: err});
            }
            res.json({info: 'Schedule created successfully'});
        });
    });

    /* Read */
    app.get('/schedules', function (req, res) {
        Schedule.find(function (err, schedules) {
            if (err) {
                res.json({info: 'error during find Schedules', error: err});
            }
            // res.json({info: 'Schedule found successfully', data: schedule});
            //to show async nature of request and check that results get cached to redis
            setTimeout(function () {
                //noinspection JSUnresolvedVariable,JSLint
                res.json({info: 'Schedules found successfully', data: schedules});
            }, 3000);
        });
    });

    app.get('/schedule/:id', function (req, res) {
        Schedule.findById(req.params.id, function (err, schedule) {
            if (err) {
                res.json({info: 'error during find schedule', error: err});
            }
            if (schedule) {
                res.json({info: 'Schedule found successfully', data: schedule});
            } else {
                res.json({info: 'Schedule not found'});
            }
        });
    });

    /* Update */
    app.put('/schedule/:id', function (req, res) {
        Schedule.findById(req.params.id, function (err, schedule) {
            if (err) {
                res.json({info: 'error during find schedule', error: err});
            }
            if (schedule) {
                _.merge(schedule, req.body);
                schedule.save(function (err) {
                    if (err) {
                        res.json({info: 'error during schedule update', error: err});
                    }
                    res.json({info: 'Schedule updated successfully'});
                });
            } else {
                res.json({info: 'Schedule not found'});
            }

        });
    });

    /* Delete */
    app.delete('/schedule/:id', function (req, res) {
        Schedule.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                res.json({info: 'error during remove schedule', error: err});
            }
            res.json({info: 'Schedule removed successfully'});
        });
    });


};