import template from './userLanding.html';
import formReadDialogTemplate from '../formRead/formReadDialog.html';
import comparisonFormTemplate from './requireComparisonFormDialog.html';
import enableContactMeTemplate from './enableContactMeDialog.html';
import unitTestFormTemplate from './unitTestFormDialog.html';

class UserLandingController {
  constructor($location, $mdDialog, $mdPanel, loomApi, lodash, moment, recruitUnitUtil, jwtHelper) {
    "ngInject";
    console.log("in UserLandingController");

    this.username = "";
    this.userguid = "";
    this.roles = "";
    this.id = "";
    this.status = "";
    this.myContentListArray = [];
    this.myContentListPassCount = 0;
    this.myContentListFailCount = 0;
    this.userFormUrl = "";
    this.isDeveloper = true;

    this._mdPanel = $mdPanel;
    this.openFrom = 'button';
    this.closeTo = 'button';

    //check if the user has a comparison test form and is a developer. Show alert dialog if not
    //todo: might need to move this to the canActivate?
    if (recruitUnitUtil.Util.getLocalUser().token !== null) {
      var decodedToken = jwtHelper.decodeToken(recruitUnitUtil.Util.getLocalUser().token);
      if (decodedToken.isComparisonFormEnabled) {
        console.log("User has a comparison form enabled");
      } else if (decodedToken.roles.indexOf(recruitUnitUtil.Constants.DEVELOPER_ROLE) != -1) {
        this.showPanel();
      }
    }
  }

  $routerOnActivate(next, previous){
    this.useremail = next.params.email;
    console.log("route param email:" + this.useremail);
  }

  showFormDetailDialog($event, id, isPass, isPartialPass){
    console.log("in showFormDetailDialog");
    console.log("form id:" + id);
    $mdDialog.show({
      controller: 'FormReadController',
      controllerAs: 'formRead',
      locals: {
        'jobDetailFormId': id,
        'isItemPass': isPartialPass || isPass ? true : false,
        'payFrequencyOptions': [
          {id: "Permanent", value: "annual salary"},
          {id: "Contract", value: "daily rate"}
        ]
      },
      bindToController: true,
      template: formReadDialogTemplate,
      parent: angular.element(document.body),
      targetEvent: $event,
      clickOutsideToClose: true,
      fullscreen: false
    }).then(function (answer) {
      //this.status = 'You said the information was "' + answer + '".';
    }, function () {
      //this.status = 'You cancelled the dialog.';
    });
  }

  deleteItem(docId, index){
    console.log("delete id:" + docId + ",index:" + index);
    //todo: ensure the update can only change the users own document
    var controllerId = "server/services/recruitunit/articles/recruitUnitContentService.controller.js";
    var jobItemModel = "server/models/RecruitUnit.Job.All.js";
    var localToken = recruitUnitUtil.Util.getLocalUser().token;
    loomApi.Article.updateArticle(docId, controllerId, jobItemModel, {"published": false}, localToken).then(angular.bind(this, function (result) {
      console.log("Delete result:");
      console.log(result);
      if (result.success) {
        this.myContentListArray.splice(index, 1);
      }
    }));
  }

  formatUnixDateToNow(unixTime){
    return moment.unix(unixTime).from();
  }

  viewItem(id){
    //console.log("view id:" + id);
    $location.path("/user/" + this.useremail + "/form/" + id);
  }

  searchUser(searchJson){
    var comparisonRulesDocId = "";
    var localToken = recruitUnitUtil.Util.getLocalUser().token;

    loomApi.Article.getUserTestResults(searchJson, localToken).then(angular.bind(this, function (listMyTestContentResult) {
      console.log("getUserTestResults:");
      console.log(listMyTestContentResult);
      if (typeof listMyTestContentResult !== 'undefined') {
        this.myContentListArray = lodash.sortBy(listMyTestContentResult, 'document.createdDate').reverse();
        this.myContentListPassCount = lodash.filter(listMyTestContentResult, {'testResult': {'isPass': true}}).length + lodash.filter(listMyTestContentResult, {'testResult': {'isPartialPass': true}}).length;
        this.myContentListFailCount = listMyTestContentResult.length - this.myContentListPassCount;

        return true; //return canActivate state once results are available
      }
    }));
  }

  navigateToUserRules(useremail){
    recruitUnitUtil.Util.redirectUserToPath(recruitUnitUtil.Constants.PATH_USER + useremail + recruitUnitUtil.Constants.PATH_COMPARISONRULESFORM);
  }

  getDeveloperEmailAddress(docId, isDeveloper, displayDevEmail){
    if (!isDeveloper && displayDevEmail) {
      var localToken = recruitUnitUtil.Util.getLocalUser().token;

      return loomApi.User.getDevEmailFromDocId(docId, localToken).then(angular.bind(this, function (result) {
        return typeof result.email !== "undefined" ? result.email : result.message;
      }));
    }
  }

  showPanel(){
    console.log("in showPanel");
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
      controllerAs: 'requireComparisonFormDialog',
      locals: {
        'useremail': this.useremail,
        'navigateToUserRules': this.navigateToUserRules
      },
      position: panelPosition,
      animation: panelAnimation,
      template: comparisonFormTemplate,
      hasBackdrop: true,
      panelClass: 'demo-dialog-example',
      zIndex: 150,
      clickOutsideToClose: true,
      escapeToClose: true,
      focusOnOpen: true
    }

    this._mdPanel.open(config);
  }

  toggleContactMeDialog($event, id, displayDevEmail, repeatScope){
    console.log("in toggleContactMeDialog");

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
      controllerAs: 'contactMeDialog',
      locals: {
        'docId': id,
        'isDisplayDevEmail': displayDevEmail,
        'isDeveloper': this.isDeveloper,
        'developerEmailAddress': this.getDeveloperEmailAddress(id, this.isDeveloper, displayDevEmail),
        itemScope: repeatScope
      },
      bindToController: true,
      position: panelPosition,
      animation: panelAnimation,
      template: enableContactMeTemplate,
      hasBackdrop: true,
      panelClass: 'demo-dialog-example',
      zIndex: 150,
      clickOutsideToClose: true,
      escapeToClose: true,
      focusOnOpen: true
    }

    this._mdPanel.open(config);
  }

  toggleUnitTestFormDialog($event, unitTestFormUrl){
    console.log("in toggleUnitTestFormDialog");
    console.log($event);
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
      panelClass: 'demo-dialog-example',
      zIndex: 150,
      clickOutsideToClose: true,
      escapeToClose: true,
      focusOnOpen: true
    }

    this._mdPanel.open(config);
  }
}

export default {
  controller: UserLandingController,
  controllerAs: 'userLanding',
  template: template,
  $canActivate: function($nextInstruction, recruitUnitUtil, jwtHelper){
    "ngInject";
    console.log("in UserLandingController canActivate");

    if (recruitUnitUtil.Util.isLocalUserAvailable()) {
      var token = jwtHelper.decodeToken(recruitUnitUtil.Util.getLocalUser().token);
      var tokenUsername = token.username;
      var tokenRoles = token.roles;
      var requestedUsername = $nextInstruction.params.email;

      var serverUrl = recruitUnitUtil.Constants.APP_PROTOCOL + recruitUnitUtil.Constants.APP_HOST + ":" + recruitUnitUtil.Constants.APP_PORT;

      return recruitUnitUtil.Util.isUserAuthenticated(tokenUsername, recruitUnitUtil.Util.getLocalUser().token).then(angular.bind(this, function (result) {
        if (result == false) {
          recruitUnitUtil.Util.redirectUserToPath(recruitUnitUtil.Constants.PATH_HOME);// todo: get path from constant;
          recruitUnitUtil.Util.deleteUserAuth();
        } else if (tokenUsername != requestedUsername) {
          recruitUnitUtil.Util.redirectUserToPath(recruitUnitUtil.Constants.PATH_USER + tokenUsername);
        } else if (result.success) {
          //set user details returned from the jwt
          this.roles = result.data.roles;
          this.id = result.data.id;
          this.username = result.data.displayName;
          this.userGuid = result.data.userGuid;
          this.userFormUrl = serverUrl + recruitUnitUtil.Constants.PATH_USER + this.userGuid + "/form";

          if (tokenRoles.indexOf("recruiter") != -1){
            var searchJson = {
              "authorEmail": tokenUsername
            };
            return this.searchUser(searchJson);
          } else if (tokenRoles.indexOf("developer") != -1){
            this.isDeveloper = true;
            var searchJson = {
              "submitTo": this.userGuid
            };
            return this.searchUser(searchJson);
          }
        }

      }));
    } else {
      //recruitUnitUtil.Util.redirectUserToPath(recruitUnitUtil.Constants.PATH_HOME);
      return true;
    }
  }
}
