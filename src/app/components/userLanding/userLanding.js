import angular from 'angular';

import UserLandingController from './UserLandingController';
import DialogController from './GenericDialogController';

export default angular
  .module('app.user.userLandingController', [])
  .component('userLanding', UserLandingController)
  .controller('genericDialogController', DialogController);