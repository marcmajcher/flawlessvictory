'use strict';

/* eslint-env angular, browser */

(() => {
  function IndexController() {
    const vm = this;

    vm.$onInit = function init() {
      vm.header = 'INDEX';
    };
  }

  angular.module('ashcan').component('index', {
    controller: IndexController,
    templateUrl: '/tmpl/index.html'
  });
})();
