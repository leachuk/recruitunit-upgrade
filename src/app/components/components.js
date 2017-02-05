import angular from 'angular';

import homeComponent from './home/home';
import userLanding from './userLanding/userLanding';

import sampleModule from './sampleComponent/sampleComponent' //defined as a module. Can contain multiple components
import sampleComponent from './sampleComponent/sampleComponent.component' //singular component

export default angular
  .module('app.components', [
    homeComponent.name,
    userLanding.name,
    sampleModule.name //include as a module. Useful for including multiple components into a module
  ])
  //.component('sampleComponent', sampleComponent) //include as single component into the module
;
