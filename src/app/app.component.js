import template from './app.html';

import controller from './app.controller';

let appComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  $routeConfig: [
    { path: '/home', component: 'home', name: 'Home', useAsDefault: true },
    { path: '/user', component: 'userlanding', name: 'UserLanding' }
  ]
};

export default appComponent;
