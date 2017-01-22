import angular from 'angular';
import angularMoment from 'angular-moment';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';

import Components from './components/components';
import services from './services/services';
import 'normalize.css';

import AppComponent from './app.component';

angular.module('app', [
  'ngMaterial',
  angularMoment,
  Components.name,
  services.name
])
.component('app', AppComponent);

angular.bootstrap(document.body, ['app'])
