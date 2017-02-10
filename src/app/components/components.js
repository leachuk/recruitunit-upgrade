import angular from 'angular';

import homeComponent from './home/home';
import userLanding from './userLanding/userLanding';

export default angular
  .module('app.components', [
    homeComponent.name,
    userLanding.name,
  ]);
