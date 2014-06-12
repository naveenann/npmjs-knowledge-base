'use strict';
angular.module('KnowledgeBase', [
    'KnowledgeBase.controllers',
    'KnowledgeBase.directives'
]).
    config(function ($routeProvider, $locationProvider) {
        $routeProvider.

            when('/search/?q=query', {
                templateUrl: 'partials/search',
                reloadOnSearch: false
            }).
            when('/search', {
                templateUrl: 'partials/search',
                reloadOnSearch: false
            }).
            when('/home', {
                templateUrl: 'partials/search'
            }).
            otherwise({
                redirectTo: '/search'
            });

        $locationProvider.html5Mode(true);
    });
