(() => {
  'use strict';

  /* eslint-env browser */

  function gapiService($rootScope, $http) {
    this.profile = {
      signedIn: false,
      onLogin: () => {}
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
      if (signedIn) {
        const googleUser = this.auth2.currentUser.get();
        const profile = googleUser.getBasicProfile();

        this.profile.name = profile.getName();
        this.profile.firstName = profile.getGivenName();
        this.profile.lastName = profile.getFamilyName();
        this.profile.imageUrl = profile.getImageUrl();
        this.profile.email = profile.getEmail();

        $http.post('/gsignin', `idtoken=${googleUser.getAuthResponse().id_token}`, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(() => { // (response)
            this.profile.signedIn = true;
            this.profile.onLogin();
          })
          .catch((error) => {
            console.error(error); // eslint-disable-line no-console
          });
      }
      else {
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
      this.auth2.signOut().then(() => {
        this.signinChanged(false);
        $http.post('/signout')
          .catch((error) => {
            console.error(error); // eslint-disable-line no-console
          });
      });
    };

    this.disconnect = function disconnect() {
      this.auth2.disconnect().then(() => {
        this.signinChanged(false);
      });
    };
  }

  gapiService.$inject = ['$rootScope', '$http'];

  angular.module('ashcan').service('GapiService', gapiService);
})();
