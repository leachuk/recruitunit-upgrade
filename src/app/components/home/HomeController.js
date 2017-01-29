class HomeController {
  constructor() {
    this.name = 'Home';
  }

  changeName() {
    this.name = 'Home Component Output';
  }
}

export default {
  controller: HomeController,
  controllerAs: 'homeComponent',
  template: `
      <div><p>{{homeComponent.name}}
      <button ng-click="homeComponent.changeName()">[change]</button>
      </p></div>
  `
}