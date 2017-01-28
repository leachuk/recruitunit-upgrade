class HomeComponentController {
  constructor(moment) {
    this.moment = moment;
    this.name = 'Home';
  }

  changeName() {
    this.name = 'Home Component Output';
  }
}

export default {
  controller: HomeComponentController,
  controllerAs: 'homeComponent',
  template: `
      <div><p>{{homeComponent.name}}[{{homeComponent.moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}}]
      <button ng-click="homeComponent.changeName()">[change]</button></p></div>
  `
}