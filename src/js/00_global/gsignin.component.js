'use strict';

/* eslint-env angular, browser */
/* globals gapi */

(() => {
  function GsigninController(GapiService, $window, $state) {
    const vm = this;

    $window.initGapi = () => {
      GapiService.init(gapi);
    };

    vm.$onInit = function onInit() {
      vm.profile = GapiService.profile;
      GapiService.profile.onLogin = () => {
        $state.go('home');
      };
    };

    vm.signOut = function signOut() {
      $state.go('index');
      GapiService.signOut();
    };
  }
  GsigninController.$inject = ['GapiService', '$window', '$state'];

  angular.module('flawless').component('gsignin', {
    controller: GsigninController,
    templateUrl: '/tmpl/gsignin.html'
  });
})();
