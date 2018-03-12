'use strict';

(function () {
  'use strict';

  /* eslint-env angular, browser */

  function routeConfig($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider.state({
      name: 'index',
      url: '/',
      component: 'index'
    }).state({
      name: 'home',
      url: '/home',
      component: 'home'
    });
  }

  routeConfig.$inject = ['$stateProvider', '$locationProvider'];

  angular.module('flawless', ['ui.router', 'blockUI', 'ui.bootstrap']).config(routeConfig);
})();
'use strict';

/* eslint-env angular, browser */
/* globals gapi */

(function () {
  function GsigninController(GapiService, $window, $state) {
    var vm = this;

    $window.initGapi = function () {
      GapiService.init(gapi);
    };

    vm.$onInit = function onInit() {
      vm.profile = GapiService.profile;
      GapiService.profile.onLogin = function () {
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
'use strict';

/* eslint-env angular, browser */

(function () {
  function HeaderController(GapiService) {
    var vm = this;

    vm.$onInit = function onInit() {
      vm.profile = GapiService.profile;
    };
  }
  HeaderController.$inject = ['GapiService'];

  angular.module('flawless').component('ffvHeader', {
    controller: HeaderController,
    templateUrl: '/tmpl/header.html'
  });
})();
'use strict';

/* eslint-env angular, browser */
/* globals $ */

(function () {
  function NewGameFormController(ProjectService) {
    var vm = this;

    vm.$onInit = function onInit() {
      vm.clear();
    };

    vm.createGame = function createGame() {
      // TK validate
      ProjectService.createProject(vm.game).then(function (response) {
        if (response.status === 200) {
          $('#newGameModal').modal('hide'); // TK do this the right way, not like this
          vm.clear();
        } else {
          // something went wrong
          console.log(response); // eslint-disable-line
        }
      }).catch(function (error) {
        console.log(error); // eslint-disable-line
      });
    };

    vm.clear = function clear() {
      vm.game = {};
    };
  }

  NewGameFormController.$inject = ['ProjectService'];

  angular.module('flawless').component('newGameForm', {
    controller: NewGameFormController,
    templateUrl: '/tmpl/newgameform.html'
  });
})();
'use strict';

/* eslint-env angular, browser */

(function () {
  function IndexController() {
    var vm = this;

    vm.$onInit = function init() {
      vm.header = 'INDEX';
    };
  }

  angular.module('flawless').component('index', {
    controller: IndexController,
    templateUrl: '/tmpl/index.html'
  });
})();
'use strict';

/* eslint-env node */

(function () {
  function HomeController(GapiService) {
    var vm = this;

    vm.$onInit = function init() {
      vm.profile = GapiService.profile;
    };
  }

  angular.module('flawless').component('home', {
    controller: HomeController,
    templateUrl: '/tmpl/home.html'
  });
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env browser */

  function gapiService($rootScope, $http) {
    this.profile = {
      signedIn: false,
      onLogin: function onLogin() {}
    };

    this.init = function init(gapi) {
      this.gapi = gapi;
      this.gapi.load('auth2', this.signIn.bind(this));
    };

    this.signIn = function signIn() {
      this.auth2 = this.gapi.auth2.getAuthInstance();
      this.auth2.isSignedIn.listen(this.signinChanged.bind(this));
      this.auth2.currentUser.listen(this.userChanged.bind(this));

      if (this.auth2.isSignedIn.get()) {
        this.auth2.signIn();
      }
    };

    this.signinChanged = function signinChanged(signedIn) {
      var _this = this;

      if (signedIn) {
        var googleUser = this.auth2.currentUser.get();
        var profile = googleUser.getBasicProfile();

        this.profile.name = profile.getName();
        this.profile.firstName = profile.getGivenName();
        this.profile.lastName = profile.getFamilyName();
        this.profile.imageUrl = profile.getImageUrl();
        this.profile.email = profile.getEmail();

        $http.post('/gsignin', 'idtoken=' + googleUser.getAuthResponse().id_token, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function () {
          // (response)
          _this.profile.signedIn = true;
          _this.profile.onLogin();
        }).catch(function (error) {
          console.error(error); // eslint-disable-line no-console
        });
      } else {
        this.profile.name = '';
        this.profile.firstName = '';
        this.profile.lastName = '';
        this.profile.imageUrl = '';
        this.profile.email = '';
        this.profile.signedIn = false;
        $rootScope.$digest();
      }
    };

    this.userChanged = function userChanged() {
      /* (user) */
    };

    this.signOut = function signOut() {
      var _this2 = this;

      this.auth2.signOut().then(function () {
        _this2.signinChanged(false);
        $http.post('/signout').catch(function (error) {
          console.error(error); // eslint-disable-line no-console
        });
      });
    };

    this.disconnect = function disconnect() {
      var _this3 = this;

      this.auth2.disconnect().then(function () {
        _this3.signinChanged(false);
      });
    };
  }

  gapiService.$inject = ['$rootScope', '$http'];

  angular.module('flawless').service('GapiService', gapiService);
})();
'use strict';

(function () {
  'use strict';

  var projectRoute = '/api/project';

  function ProjectService($http) {
    this.getProject = function getProject() {};

    this.createProject = function createProject(data) {
      return $http.post(projectRoute, data);
    };
  }

  ProjectService.$inject = ['$http'];

  angular.module('flawless').service('ProjectService', ProjectService);
})();