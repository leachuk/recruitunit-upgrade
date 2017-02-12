import angular from 'angular';

import homeComponent from './home/home';
import userLanding from './userLanding/userLanding';
import formSubmit from './formSubmit/formSubmit';
import comparisonRule from './comparisonRule/comparisonRule';

export default angular
  .module('app.components', [
    homeComponent.name,
    userLanding.name,
    formSubmit.name,
    comparisonRule.name
  ]);
