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
        <p>{{sampleComponent.name}}</p>
    `
}
