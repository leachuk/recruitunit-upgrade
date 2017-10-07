import angular from 'angular';

import Controller from './FormSubmitController';
import LoginModalDialogController from './LoginModalDialogController';

export default angular
  .module('app.user.formSubmitController', [])
  .component('formSubmit', Controller)
  .controller('loginModalDialogController', LoginModalDialogController);