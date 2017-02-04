class MainController {
  constructor() {
    "ngInject";
    this.name = 'Main';

    console.log('In MainController');
  }

  changeName() {
    this.name = 'Sample Component Output';
  }

  initApp(){
    console.log("In MainController > initApp");
  }
}

export default MainController;
