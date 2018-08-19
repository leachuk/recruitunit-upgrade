import angular from 'angular';

import RecruiterLandingController from './RecruiterLandingController';
import DialogController from './GenericDialogController';
import FormReadController from '../formRead/FormReadController';

export default angular
  .module('app.user.recruiterLandingController', [])
  .component('recruiterLanding', RecruiterLandingController)
  .controller('genericDialogController', DialogController)
  .controller('formReadController', FormReadController.controller);