import routerTemplate from './router.html';

let rootComponent = {
  restrict: 'E',
  bindings: {},
  template: routerTemplate,
  $routeConfig: [
    { path: '/home', component: 'home', name: 'Home', useAsDefault: true },
    { path: '/user/:email', component: 'userLanding', name: 'UserLanding'}
  ]
};

export default rootComponent;
