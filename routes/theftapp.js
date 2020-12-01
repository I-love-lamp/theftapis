'use strict';
// makes request calls to secondary servers (thefts and schedules) and nodeJS aggregates the data
var r = require('request').defaults({
    json: true
});

// async library manages server requests asynchronously, prevents blocking
var async = require('async');

//redis caches results to improve performance (in memory key-value store)
var redis = require('redis');

//create redis client on port 6379
var client = redis.createClient(6379, '127.0.0.1');

module.exports = function (app) {

    /* Read */
    app.get('/theftreports', function (req, res) {
        // take in key-pair values to make parallel requests
        //noinspection JSLint
        async.parallel({
            //request theft, return errors
            theft: function (callback){
                //noinspection JSLint,JSLint
                r({uri: 'http://localhost:3000/theft'}, function (error, response, body) {
                    if (error) {
                        //
                        callback({service: 'theft', error: error});
                        return;
                    }
                    if (!error && response.statusCode === 200) {
                        //send back the request body
                        callback(null, body.data);
                    } else {
                        //send status code if desired result is not returned
                        callback(response.statusCode);
                    }
                });
            },
            //request schedule, return errors
            schedule: function (callback) {
                //request object from cache
                client.get('http://localhost:3001/schedule', function (error, schedule) {
                    if (error) {throw error; }
                    //if the object is in the cache
                    if (schedule) {
                        //if returned from cache, stringify it to an object
                        callback(null, JSON.parse(schedule));
                    } else {
                        //otherwise request the resource from service end-point
                        r({uri: 'http://localhost:3001/schedule'}, function (error, response, body) {
                            if (error) {
                                callback({service: 'schedule', error: error});
                                return;
                            }
                            if (!error && response.statusCode === 200) {
                                callback(null, body.data);
                                // client.set('http://localhost:3001/schedule', JSON.stringify(body.data), function (error) {
                                //this block sends the API response to cache
                                //set key (our api result) to stringified data and set data expiration in seconds
                                client.setex('http://localhost:3001/schedule', 10, JSON.stringify(body.data), function (error) {
                                    if (error) {throw error; }
                                });
                            } else {
                                callback(response.statusCode);
                            }
                        });
                    }
                });
            }
        },
        //when all request callbacks are resolved, aggregate results
        function(error, results) {
                res.json({
                    error: error,
                    results: results
                });
        });
    });
    //function to check asynchronous activities on this server
    app.get('/ping', function (req, res) {
        res.json({pong: Date.now()});
    });

};