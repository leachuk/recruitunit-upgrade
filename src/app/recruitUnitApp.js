import angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-material/angular-material.css';
import '@angular/router/angular1/angular_1_router.js';
import 'angular-jwt';
import 'ng-lodash';
import 'angular-moment';
import 'angular-resource';
import 'angular-cookies';

import 'loom-api-angular';
import Services from './services/services';

import Components from './components/components';
import RootComponent from './root.component';

import '../css/global.css';

angular.module('recruitUnitApp', [
  'ngComponentRouter',
  'ngMaterial',
  'ngResource',
  'ngCookies',
  'loom.api',
  'ngLodash',
  'angularMoment',
  'angular-jwt',
  Components.name,
  Services.name
  // 'app.user.userLandingController',
  // 'app.user.formSubmitController',
  // 'app.user.formReadController',
  // 'app.user.comparisonRuleController',
  // 'recruitunit.util'
])
.value('$routerRootComponent', 'app')
.component('app', RootComponent)
.controller('AppController', ['$mdComponentRegistry', 'loomApi', 'jwtHelper', 'recruitUnitUtil', 'globals', AppController])//'recruitUnitUtil',
.config(['$locationProvider', '$httpProvider', '$mdIconProvider', function($locationProvider, $httpProvider, $mdIconProvider){

  $locationProvider.html5Mode(true);

  $mdIconProvider
    .iconSet('action', './assets/svg/action-icons.svg', 24)
    .iconSet('content', './assets/svg/content-icons.svg', 24)
    .iconSet('av', './assets/svg/av-icons.svg', 24)
    .iconSet('navigation', './assets/svg/navigation-icons.svg', 24)
    .iconSet('social', './assets/svg/social-icons.svg', 24)
    .defaultIconSet('./assets/svg/action-icons.svg');
}]);

function AppController($mdComponentRegistry, loomApi, jwtHelper, recruitUnitUtil, globals) { //recruitUnitUtil,
  var sideNav;

  globals.user = {
    email: "",
    password: ""
  };

  this.submitmessage = "";

  console.log("In AppController");

  //should fail
  //recruitUnitUtil.Constants.APP_HOST = "bar";
  //console.log(recruitUnitUtil.Constants.APP_HOST); //correctly fails. Todo: install babel plugin to catch this error
  
  $mdComponentRegistry.when('sidenav-main').then(function(mainSideNav){
    sideNav = mainSideNav;

  });
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
    // globals.user.isLoggedIn = recruitUnitUtil.Util.isLocalUserLoggedIn();
    // globals.user.isDeveloper = recruitUnitUtil.Util.getUserRoles().indexOf(recruitUnitUtil.Constants.DEVELOPER_ROLE) != -1;
    // if (globals.user.isLoggedIn){
    //   globals.user.email = recruitUnitUtil.Util.getLocalUser().email;
    // }
  }

  AppController.prototype.test = function() {
    console.log("test");
  }

  AppController.prototype.toggleSideNav = function() {
    sideNav.toggle();
  }

  //login existing user
  AppController.prototype.signInUser = function(){
    console.log("in signInUser");
    console.log(globals.user);

    loomApi.User.signInUser(globals.user.email, globals.user.password).then(angular.bind(this,function(result, status, headers, config) {
      console.log(result);
      console.log(status);
      console.log(headers);
      console.log(config);

      if (result.success) {
        recruitUnitUtil.Util.persistUserAuth(result.token, globals.user.email);
        this.initApp();
        globals.user.password = "";
        this.submitmessage = "";

        recruitUnitUtil.Util.redirectUserToPath(recruitUnitUtil.Constants.PATH_USER + globals.user.email);
      } else {
        recruitUnitUtil.Util.redirectUserToPath(recruitUnitUtil.Constants.PATH_HOME);
      }
    }));
  }

  AppController.prototype.signOutUser = function(){
    console.log("in signOutUser");
    recruitUnitUtil.Util.deleteUserAuth();
    recruitUnitUtil.Util.redirectUserToPath("/home");
  }

}


