import angular from 'angular';

import todoTextInput from './todoTextInput/todoTextInput';

import todoItemComponent from './todoItem.component';
import todoFooterComponent from './todoFooter.component';
import todoBatchToggle from './todoBatchToggle.component';
import todoListFilter from './todoListFilter.component';

import sampleModule from './sampleComponent/sampleComponent' //defined as a module. Can contain multiple components
import sampleComponent from './sampleComponent/sampleComponent.component' //singular component

export default angular
  .module('app.components', [
    todoTextInput.name,
    sampleModule.name //include as a module. Useful for including multiple components into a module
  ])
  .component('todoItem', todoItemComponent)
  .component('todoFooter', todoFooterComponent)
  .component('todoBatchToggle', todoBatchToggle)
  .component('todoListFilter', todoListFilter)
  //.component('sampleComponent', sampleComponent) //include as single component into the module
;
