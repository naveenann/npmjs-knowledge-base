'use strict';

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
  res.json([
    {
      name : 'HTML5 Boilerplate',
      info : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
      awesomeness: 10
    }, {
      name : 'AngularJS',
      info : 'AngularJS is a toolset for building the framework most suited to your application development.',
      awesomeness: 10
    }, {
      name : 'Karma',
      info : 'Spectacular Test Runner for JavaScript.',
      awesomeness: 10
    }, {
      name : 'Express',
      info : 'Flexible and minimalist web application framework for node.js.',
      awesomeness: 10
    }
  ]);
};
var oss = require('node-oss-client');
var http_request = require("request");
var nconf = require('nconf');
nconf.file('./config.json');
var client = oss.createClient({
    hostname: nconf.get('hostname'),
    port: nconf.get('port'),
    protocol: nconf.get('protocol'),
    login: nconf.get('login'),
    key: nconf.get('key')
});
var indexname = nconf.get('indexname');
var serverURL = nconf.get('protocol') + '://' + nconf.get('hostname') + ':' + nconf.get('port');
console.log(serverURL);
exports.autocomplete = function (autocompleteRequest, response) {
    var autoCompleteURL = serverURL + '/autocompletion?use=' + nconf.get('indexname') + '&login=' + nconf.get('login') + '&key=' + nconf.get('key') + '&query=';
    http_request(autoCompleteURL + autocompleteRequest.params.query, function (error, res, body) {
        if (typeof body != 'undefined' && res.statusCode == 200) {
            response.json({
                results: body.split('\n')
            });
        } else {
            response.json({
                results: ''
            });
        }
    });
};
exports.isServerUP = function (request, response) {
    var moniterURL = serverURL+'/services/rest/monitor/json?'+ '&login=' + nconf.get('login') + '&key=' + nconf.get('key');
    http_request(moniterURL, function (error, res, body) {
        if (typeof res != 'undefined' && res.statusCode == 200) {
            response.json({
                status: body
            });
        } else {
            response.json({
                status: false
            });
        }
    });
};

exports.searchFacet = function (request, response) {
    client.search(indexname, {
        "query": request.params.query,
        "start": 0,
        "rows": 10,
        "lang": "ENGLISH",
        "operator": "AND",
        "facets": [
            {
                "field": "Category",
                "minCount": 1,
                "multivalued": false,
                "postCollapsing": false
            }

        ], "searchFields": [
            {
                "field": "title",
                "mode": "PATTERN",
                "boost": 10
            },
            {
                "field": "content",
                "mode": "PATTERN",
                "boost": 1
            },
            {
                "field": "titleExact",
                "mode": "PATTERN",
                "boost": 10
            },
            {
                "field": "contentExact",
                "mode": "PATTERN",
                "boost": 1
            }
        ]

    }, function (err, res) {

        response.json({
            results: res

        });
    });
};
exports.search = function (request, response) {

    var page = request.params.paging;
    var start = page * 10;
    var filter = 'Category:' + request.params.filter;
    var catFilter = [];
    if (typeof filter != "undefined" && request.params.filter != '' && request.params.filter != 'default') {
        catFilter = [
            {
                "type": "QueryFilter",
                "negative": false,
                "query": filter
            }
        ];
    }
    client.search(indexname, {
        "query": request.params.query,
        "start": start,
        "rows": 10,
        "lang": "ENGLISH",
        "operator": "AND",
        "returnedFields": [
            "url"
        ],
        "filters": catFilter,
        "snippets": [
            {
                "field": "title",
                "tag": "",
                "separator": "...",
                "maxSize": 200,
                "maxNumber": 1,
                "fragmenter": "NO"
            },
            {
                "field": "content",
                "tag": "",
                "separator": "...",
                "maxSize": 200,
                "maxNumber": 1,
                "fragmenter": "NO"
            }
        ], "searchFields": [
            {
                "field": "title",
                "mode": "PATTERN",
                "boost": 10
            },
            {
                "field": "content",
                "mode": "PATTERN",
                "boost": 1
            },
            {
                "field": "titleExact",
                "mode": "PATTERN",
                "boost": 10
            },
            {
                "field": "contentExact",
                "mode": "PATTERN",
                "boost": 1
            }
        ]

    }, function (err, res) {
        response.json({
            results: res

        });
    });

};

