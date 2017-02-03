class AppController {
  constructor($routerRootComponent) {
    "ngInject";
    this.name = 'foo bar';
    console.log('In AppController');

    console.log($routerRootComponent);
  }
}

export default AppController;
