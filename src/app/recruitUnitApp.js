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
import 'angular-messages';

import 'loom-api-angular';
import Services from './services/services';

import Components from './components/components';
import RootComponent from './root.component';
import unitTestFormTemplate from './unitTestFormDialog.html';
import './recruitunit.config';

import '../css/global.css';

angular.module('recruitUnitApp', [
  'ngComponentRouter',
  'ngMaterial',
  'ngResource',
  'ngCookies',
  'ngMessages',
  'loom.api',
  'ngLodash',
  'angularMoment',
  'angular-jwt',
	'recruitunit.config',
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
.controller('AppController', ['$mdComponentRegistry', '$mdPanel', '$mdDialog', 'loomApi', 'jwtHelper', 'recruitUnitUtil', 'globals', 'recruitUnitConfig', AppController])//'recruitUnitUtil',
.config(['$locationProvider', '$httpProvider', '$mdIconProvider', '$mdThemingProvider',  function($locationProvider, $httpProvider, $mdIconProvider, $mdThemingProvider){

  $locationProvider.html5Mode(true);

  $mdIconProvider
    .iconSet('action', './assets/svg/action-icons.svg', 24)
    .iconSet('content', './assets/svg/content-icons.svg', 24)
    .iconSet('av', './assets/svg/av-icons.svg', 24)
    .iconSet('navigation', './assets/svg/navigation-icons.svg', 24)
    .iconSet('social', './assets/svg/social-icons.svg', 24)
    .defaultIconSet('./assets/svg/action-icons.svg');

  var black = $mdThemingProvider.extendPalette('grey', {
      '500': '#191919',
      'contrastDefaultColor': 'dark'
  });

  // Register the new color palette map with the name <code>neonRed</code>
  $mdThemingProvider.definePalette('grey', black);

  $mdThemingProvider.theme('default')
      .primaryPalette('grey')
      .dark();
}]);

function AppController($mdComponentRegistry, $mdPanel, $mdDialog, loomApi, jwtHelper, recruitUnitUtil, globals, recruitUnitConfig) {
  var sideNav;

  this.user = {
    email: "",
    password: ""
  };

  this.submitmessage = "";

  this._mdPanel = $mdPanel;
  this.$mdDialog = $mdDialog;

  if (recruitUnitConfig.APP_PORT != 80) {
		var serverUrl = recruitUnitConfig.APP_PROTOCOL + recruitUnitConfig.APP_HOST + ":" + recruitUnitConfig.APP_PORT;
  } else {
		var serverUrl = recruitUnitConfig.APP_PROTOCOL + recruitUnitConfig.APP_HOST;
  }

  console.log("In AppController");

  //should fail
  //recruitUnitUtil.Constants.APP_HOST = "bar";
  //console.log(recruitUnitUtil.Constants.APP_HOST); //correctly fails. Todo: install babel plugin to catch this error
  
  $mdComponentRegistry.when('sidenav-main').then(function(mainSideNav){
    sideNav = mainSideNav;
  });


  AppController.prototype.initApp = function() {
    console.log("initApp");

    loomApi.init({
      "hostname": recruitUnitConfig.BARDLY_API_HOSTNAME,
      "port": recruitUnitConfig.BARDLY_API_PORT
    });

    this.user.isLoggedIn = recruitUnitUtil.Util.isLocalUserLoggedIn();
    this.user.isDeveloper = recruitUnitUtil.Util.getUserRoles().indexOf(recruitUnitUtil.Constants.DEVELOPER_ROLE) != -1;
    if (this.user.isLoggedIn){
      this.user.email = recruitUnitUtil.Util.getLocalUser().email;
    }
  }

  AppController.prototype.test = function() {
    console.log("app test");
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

  AppController.prototype.toggleUnitTestFormDialog =function($event){
      console.log("in toggleUnitTestFormDialog");

      var token = jwtHelper.decodeToken(recruitUnitUtil.Util.getLocalUser().token);
      if (typeof token.userGuid != 'undefined') {
          var unitTestFormUrl = serverUrl + recruitUnitUtil.Constants.PATH_USER + token.userGuid + "/form";
      }
      console.log(unitTestFormUrl);

      var panelPosition = this._mdPanel.newPanelPosition()
          .absolute()
          .center();
      var panelAnimation = this._mdPanel.newPanelAnimation();
      panelAnimation.openFrom({top: 0, left: 0});
      panelAnimation.closeTo({top: document.documentElement.clientHeight, left: 0});
      panelAnimation.withAnimation(this._mdPanel.animation.SCALE);

      var config = {
          attachTo: angular.element(document.body),
          controller: 'genericDialogController',
          controllerAs: 'unitTestFormDialog',
          locals: {
              'testFormUrl': unitTestFormUrl
          },
          bindToController: true,
          position: panelPosition,
          animation: panelAnimation,
          template: unitTestFormTemplate,
          hasBackdrop: true,
          panelClass: 'generic-dialog',
          zIndex: 150,
          clickOutsideToClose: true,
          escapeToClose: true,
          focusOnOpen: true
      }

      this._mdPanel.open(config);
  }

}


