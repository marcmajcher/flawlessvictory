(() => {
  'use strict';

  /* eslint-env angular, browser */

  function routeConfig($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider.state({
        name: 'index',
        url: '/',
        component: 'index'
      })
      .state({
        name: 'home',
        url: '/home',
        component: 'home'
      });
  }

  routeConfig.$inject = ['$stateProvider', '$locationProvider'];

  angular.module('ashcan', ['ui.router', 'blockUI', 'ui.bootstrap']).config(routeConfig);
})();
