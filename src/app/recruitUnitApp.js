import angular from 'angular';
import '@angular/router/angular1/angular_1_router.js';

// import 'loom-api-angular';

import HomeComponent from './components/home/home';

import RootComponent from './root.component';

import AppComponent from './app.component';
import MainController from './main.controller';

import '../css/global.css';

angular.module('recruitUnitApp', [
  'ngComponentRouter',
  HomeComponent.name
])
.value('$routerRootComponent', 'app')
.component('app', AppComponent)
.controller('AppController', [MainController])
.config(['$locationProvider', function($locationProvider){
  console.log('Inline config');
  $locationProvider.html5Mode(true).hashPrefix("!");

}]);

function AppController($mdComponentRegistry, recruitUnitUtil, jwtHelper) { //loomApi,
  var sideNav;
  this.user = {
    email: "",
    password: ""
  };
  this.submitmessage = "";
  
  // $mdComponentRegistry.when('sidenav-main').then(function(mainSideNav){
  //   sideNav = mainSideNav;
  //   //mainSideNav.open();
  //   //console.log(mainSideNav.isOpen());
  // });
  //$mdSidenav('left').open();
  //todo: refactor to angular-ui-router

  // $router.config([
  //   { path: '/', redirectTo: '/home' },
  //   { path: '/home', component: 'home' },
  //   { path: '/user/:email', component: 'userLanding' },
  //   { path: '/user/:email/comparisonrules', component: 'comparisonRule' },
  //   { path: '/user/:guid/form', component: 'formSubmit' },
  //   { path: '/user/:email/form/:id', component: 'formRead' }
  // ]);

  AppController.prototype.initApp = function() {
    // this.user.isLoggedIn = recruitUnitUtil.Util.isLocalUserLoggedIn();
    // this.user.isDeveloper = recruitUnitUtil.Util.getUserRoles().indexOf(recruitUnitUtil.Constants.DEVELOPER_ROLE) != -1;
    // if (this.user.isLoggedIn){
    //   this.user.email = recruitUnitUtil.Util.getLocalUser().email;
    // }
  }

}


