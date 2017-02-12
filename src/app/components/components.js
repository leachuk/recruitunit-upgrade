import angular from 'angular';

import homeComponent from './home/home';
import userLanding from './userLanding/userLanding';
import formSubmit from './formSubmit/formSubmit';

export default angular
  .module('app.components', [
    homeComponent.name,
    userLanding.name,
    formSubmit.name
  ]);
