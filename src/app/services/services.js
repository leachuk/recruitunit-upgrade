import angular from 'angular';

import recruitUnitUtil from './RecruitUnitUtil';
import globals from './Globals';

export default angular
  .module('app.services', [])
  .service({
    recruitUnitUtil,
    globals
  });
