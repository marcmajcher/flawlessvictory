(() => {
  'use strict';

  const projectRoute = '/api/project';

  function ProjectService($http) {
    this.getProject = function getProject() {

    };

    this.createProject = function createProject(data) {
      return $http.post(projectRoute, data);
    };
  }

  ProjectService.$inject = ['$http'];

  angular.module('ashcan').service('ProjectService', ProjectService);
})();
