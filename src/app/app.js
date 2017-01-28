import angular from 'angular';
import angularMoment from 'angular-moment';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-material/angular-material.css';

import '../css/global.css';

import Components from './components/components';
import services from './services/services';

import AppComponent from './app.component';

angular.module('app', [
  'ngMaterial',
  angularMoment,
  Components.name,
  services.name
])
.component('app', AppComponent);

angular.bootstrap(document.body, ['app'])
