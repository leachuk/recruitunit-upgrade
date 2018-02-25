import angular from 'angular';

import Controller from './FormJobSpecController';
import LoginModalDialogController from './LoginModalDialogController';

export default angular
  .module('app.user.formJobSpecController', [])
  .component('formJobSpec', Controller)
  .controller('loginModalDialogController', LoginModalDialogController);