import angular from 'angular';
import angularMoment from 'angular-moment';
import Components from './components/components';
import services from './services/services';
import 'normalize.css';

import AppComponent from './app.component';

angular.module('app', [
  angularMoment,
  Components.name,
  services.name
])
.component('app', AppComponent);

angular.bootstrap(document.body, ['app'])
