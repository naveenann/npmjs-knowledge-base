'use strict';

angular.module('kbv1App')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
        'title': 'Download',
        'link': 'http://www.opensearchserver.com#download'

    },{
        'title': 'Documentation',
        'link': 'http://www.opensearchserver.com/documentation'

    },{
        'title': 'Support',
        'link': 'http://www.opensearchserver.com#support'

    },{
        'title': 'SaaS',
        'link': 'http://www.opensearchserver.com#Saas'

    },{
        'title': 'Contact',
        'link': 'http://www.opensearchserver.com#contact'

    }];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
