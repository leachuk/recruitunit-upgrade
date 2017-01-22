import angular from 'angular';

import todoTextInput from './todoTextInput/todoTextInput';

import todoItemComponent from './todoItem.component';
import todoFooterComponent from './todoFooter.component';
import todoBatchToggle from './todoBatchToggle.component';
import todoListFilter from './todoListFilter.component';

import sampleComponent from './sampleComponent/sampleComponent'

export default angular
  .module('app.components', [
    todoTextInput.name,
    sampleComponent.name
  ])
  .component('todoItem', todoItemComponent)
  .component('todoFooter', todoFooterComponent)
  .component('todoBatchToggle', todoBatchToggle)
  .component('todoListFilter', todoListFilter)
  //.component('sampleComponent', sampleComponent)
;
