'use strict';
var _ = require('lodash');
var Theft = require('../models/thefts.js');

module.exports = function (app) {

    /* Create */
    app.post('/theft', function (req, res) {
        var newTheft = new Theft(req.body);
        newTheft.save(function (err) {
            if (err) {
                res.json({info: 'error during theft create', error: err});
            }
            res.json({info: 'Theft created successfully'});
        });
    });

    /* Read */
    app.get('/thefts', function (req, res) {
        //check the model and search for records
        Theft.find(function (err, thefts) {
            if (err) {
                res.json({info: 'error during find theft', error: err});
            }
            res.json({info: 'Theft reports found successfully', data: thefts});
        });
    });
    /* Read one */
    app.get('/theft/:id', function (req, res) {
        //check the model and search for records with matching id
        Theft.findById(req.params.id, function (err, theft) {
            if (err) {
                res.json({info: 'error during find theft', error: err});
            }
            if (theft) {
                // res.json({info: 'theft found successfully', data: theft});
                setTimeout(function () {
                    res.json({info: 'Theft found successfully', data: theft});
                }, 10000);
            } else {
                res.json({info: 'Theft not found'});
            }
        });
    });

    /* Update */
    app.put('/theft/:id', function (req, res) {
        Theft.findById(req.params.id, function (err, theft) {
            if (err) {
                res.json({info: 'error during find theft', error: err});
            }
            if (theft) {
                _.merge(theft, req.body);
                theft.save(function (err) {
                    if (err) {
                        res.json({info: 'error during theft update', error: err});
                    }
                    res.json({info: 'theft updated successfully'});
                });
            } else {
                res.json({info: 'theft not found'});
            }
        });
    });

    /* Delete */
    app.delete('/theft/:id', function (req, res) {
        Theft.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                res.json({info: 'error during remove theft', error: err});
            }
            res.json({info: 'theft removed successfully'});
        });
    });
};