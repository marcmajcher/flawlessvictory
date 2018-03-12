'use strict';

/* eslint-env node */

(() => {
  function HomeController(GapiService) {
    const vm = this;

    vm.$onInit = function init() {
      vm.profile = GapiService.profile;
    };
  }

  angular.module('ashcan').component('home', {
    controller: HomeController,
    templateUrl: '/tmpl/home.html'
  });
})();
