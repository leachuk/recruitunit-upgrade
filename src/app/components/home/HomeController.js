import template from './home.html';

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
  template: template
}