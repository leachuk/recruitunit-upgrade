import angular from 'angular';

import UserLandingController from './UserLandingController';
import DialogController from './RequireComparisonFormDialogController';

export default angular
  .module('app.user.userLandingController', [])
  .component('userLanding', UserLandingController);