class SampleComponentController {
    constructor() {
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
        <div><p>{{sampleComponent.name}}<button ng-click="sampleComponent.changeName()">[change]</button></p></div>
    `
}
