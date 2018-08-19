import angular from 'angular';

import homeComponent from './home/home';
import userLanding from './userLanding/userLanding';
import recruiterLanding from './recruiterLanding/recruiterLanding';
import formSubmit from './formSubmit/formSubmit';
import formJobSpec from './formJobSpec/formJobSpec';
import comparisonRule from './comparisonRule/comparisonRule';

export default angular
  .module('app.components', [
    homeComponent.name,
    userLanding.name,
		recruiterLanding.name,
    formSubmit.name,
    formJobSpec.name,
    comparisonRule.name
  ]);
