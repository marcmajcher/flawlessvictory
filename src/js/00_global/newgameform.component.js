'use strict';

/* eslint-env angular, browser */
/* globals $ */

(() => {
  function NewGameFormController(ProjectService) {
    const vm = this;

    vm.$onInit = function onInit() {
      vm.clear();
    };

    vm.createGame = function createGame() {
      // TK validate
      ProjectService.createProject(vm.game)
        .then((response) => {
          if (response.status === 200) {
            $('#newGameModal').modal('hide'); // TK do this the right way, not like this
            vm.clear();
          }
          else {
            // something went wrong
            console.log(response); // eslint-disable-line
          }
        })
        .catch((error) => {
          console.log(error); // eslint-disable-line
        });
    };

    vm.clear = function clear() {
      vm.game = {};
    };
  }

  NewGameFormController.$inject = ['ProjectService'];

  angular.module('ashcan').component('newGameForm', {
    controller: NewGameFormController,
    templateUrl: '/tmpl/newgameform.html'
  });
})();
