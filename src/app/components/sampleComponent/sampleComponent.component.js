class SampleComponentController {
  constructor(moment) {
    'ngInject';
    this.moment = moment;
    this.name = 'World';
  }

  changeName() {
    this.name = 'Sample Component Output';
  }
}

export default {
  controller: SampleComponentController,
  controllerAs: 'sampleComponent',
  template: `
      <div><p>{{sampleComponent.name}}[{{sampleComponent.moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}}]
      <button ng-click="sampleComponent.changeName()">[change]</button></p></div>
  `
}
