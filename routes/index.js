'use strict';

/*
 * GET home page.
 */

var ua      = require('mobile-agent');

exports.index = function(req, res){
    var agent = ua(req.headers['user-agent'])

    if(agent.Mobile === true) {
        res.render('mobile/index');
    } else {
        res.render('index');
    }
};

exports.partials = function (req, res) {
    var name = req.params.name;
    var agent = ua(req.headers['user-agent'])

    if(agent.Mobile === true) {
        res.render('mobile/partials/' + name);
    } else {
        res.render('partials/' + name);
    }

};