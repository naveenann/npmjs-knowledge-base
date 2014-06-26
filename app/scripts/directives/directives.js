'use strict';

/**
 * @ngdoc directive
 * @name kbv1App.directive:directives
 * @description
 * # directives
 */
angular.module('kbv1App')
    .directive('directives', function () {
        return {
            template: '<div></div>',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                element.text('this is the directives directive');
            }
        };
    }).directive('loading', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="loading"><img src="/images/ajax-loader.gif" width="20" height="20" />LOADING...</div>',
            link: function (scope, element, attr) {
                scope.$watch('loading', function (val) {
                    if (val)
                        $(element).show();
                    else
                        $(element).hide();
                });
            }
        }
    }).directive('autoComplete', function ($timeout) {
        return function (scope, iElement, iAttrs) {
            iElement.autocomplete({
                source: scope[iAttrs.uiItems],
                select: function () {
                    $timeout(function () {
                        iElement.trigger('input');
                    }, 0);
                }
            });
        };
    });
