import template from './requireComparisonFormDialog.html';

class RequireComparisonFormDialogController {
  constructor(loomApi, recruitUnitUtil, globals) {
    "ngInject";
    console.log("in RequireComparisonFormDialogController");

  }
}


export default {
  controller: RequireComparisonFormDialogController,
  controllerAs: 'requireComparisonLanding',
  template: template
}