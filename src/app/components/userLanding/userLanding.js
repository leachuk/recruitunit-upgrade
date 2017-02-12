import angular from 'angular';

import UserLandingController from './UserLandingController';
import DialogController from './GenericDialogController';
import FormReadController from '../formRead/FormReadController';

export default angular
  .module('app.user.userLandingController', [])
  .component('userLanding', UserLandingController)
  .controller('genericDialogController', DialogController)
  .controller('formReadController', FormReadController.controller);