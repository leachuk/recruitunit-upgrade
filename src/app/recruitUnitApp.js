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

import Components from './components/components';
import HomeComponent from './components/home/home';

import '../css/global.css';

var recruitUnitApp = angular.module('recruitUnitApp', [
  'ngComponentRouter',
  'ngMaterial',
  'ngResource',
  'ngCookies',
  'loom.api',
  'ngLodash',
  'angularMoment',
  'angular-jwt',
  HomeComponent.name
  // 'app.user.userLandingController',
  // 'app.user.formSubmitController',
  // 'app.user.formReadController',
  // 'app.user.comparisonRuleController',
  // 'recruitunit.util'
])
.value('$routerRootComponent', 'recruitUnitApp')
.controller('AppController', ['$mdComponentRegistry', 'loomApi', 'jwtHelper', AppController]) //todo, add back 'recruitUnitUtil',
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

function AppController($mdComponentRegistry, loomApi, recruitUnitUtil, jwtHelper) {
  var sideNav;
  this.user = {
    email: "",
    password: ""
  };
  this.submitmessage = "";
  
  $mdComponentRegistry.when('sidenav-main').then(function(mainSideNav){
    sideNav = mainSideNav;
    //mainSideNav.open();
    //console.log(mainSideNav.isOpen());
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
    // this.user.isLoggedIn = recruitUnitUtil.Util.isLocalUserLoggedIn();
    // this.user.isDeveloper = recruitUnitUtil.Util.getUserRoles().indexOf(recruitUnitUtil.Constants.DEVELOPER_ROLE) != -1;
    // if (this.user.isLoggedIn){
    //   this.user.email = recruitUnitUtil.Util.getLocalUser().email;
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
    console.log(this.user);

    loomApi.User.signInUser(this.user.email, this.user.password).then(angular.bind(this,function(result, status, headers, config) {
      console.log(result);
      console.log(status);
      console.log(headers);
      console.log(config);

      if (result.success) {
        recruitUnitUtil.Util.persistUserAuth(result.token, this.user.email);
        this.initApp();
        this.user.password = "";
        this.submitmessage = "";

        recruitUnitUtil.Util.redirectUserToPath(recruitUnitUtil.Constants.PATH_USER + this.user.email);
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


