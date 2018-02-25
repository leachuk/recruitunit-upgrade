import template from './formJobSpec.html';
import loginModalTemplate from './loginModalTemplate.html';

class FormJobSpecController {
  constructor($location, loomApi, recruitUnitUtil, jwtHelper, globals, $mdPanel){
    "ngInject";
    console.log("FormJobSpecController instantiated");

    this.$location = $location;
    this.loomApi = loomApi;
    this.recruitUnitUtil = recruitUnitUtil;
    this.jwtHelper = jwtHelper;
    this.globals = globals;
    this._mdPanel = $mdPanel;

    this.recruitUnitUtil.Util.setTitle("Submit Form Page");

    this.authenticatedUser = this.recruitUnitUtil.Util.getLocalUser();

    this.payFrequencyOptions = [
      {id: "Permanent", value: "annual salary"},
      {id: "Contract", value: "daily rate"}
    ];
    this.article = {
      "jobDescription" : "",
      "currency": "",
      "roleType": "",
      "payBracketLower": null,
      "payBracketUpper": null,
      "locationDescription": "",
      "skills": [],
      "submitTo" : "",
      "authorEmail" : this.authenticatedUser.email,
      "published" : true
    };

    this.currencylist = recruitUnitUtil.Currency;
  }

  $routerOnActivate(next, previous){
    this.submitTo = next.params.guid;

    this.authToken = this.recruitUnitUtil.Util.getLocalUser().token;
    if (this.authToken !== null){
      this.token = this.jwtHelper.decodeToken(this.authToken);
      this.tokenUsername = this.token.username;
      this.tokenRoles = this.token.roles;
      this.isDeveloper = this.tokenRoles.indexOf(this.recruitUnitUtil.Constants.RECRUITER_ROLE) == -1;
    } else {
      console.log("do not pass go!");
      this.showLoginModal();
    }

  }

	submitJobSpecForm(){
    console.log("in submitJobSpecForm");
    this.authToken = this.recruitUnitUtil.Util.getLocalUser().token;

    if(submitJobFromRecruiter.checkValidity() && typeof this.authToken != 'undefined'){ //submitJobFromRecruiter is form name
      this.article.submitTo = this.submitTo;

      console.log("model:");
      console.log(this.article);

      this.loomApi.Article.createJobSubmission(this.article, this.authToken).then(angular.bind(this,function(saveResult){
        console.log("result:");
        console.log(saveResult);

        saveResult.success ? this.$location.path("/user/" + this.authenticatedUser.email) : this.submitmessage = "Error. " + saveResult.message;
      }));
    }
  }

  showLoginModal(){
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
      controller: 'loginModalDialogController',
      controllerAs: 'loginModalDialog',
      locals: {
        'email': "",
        'password': ""
      },
      position: panelPosition,
      animation: panelAnimation,
      template: loginModalTemplate,
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

export default{
  controller: FormJobSpecController,
  controllerAs: 'formJobSpec',
  template: template,
  $canActivate: function(recruitUnitUtil, jwtHelper, globals) {
    "ngInject";
    var token = recruitUnitUtil.Util.getLocalUser().token;

    if (token !== null) {
      var decodedToken = jwtHelper.decodeToken(recruitUnitUtil.Util.getLocalUser().token); //todo: handle no token
      var userRoles = decodedToken.roles;
      var tokenUsername = decodedToken.username;

      return recruitUnitUtil.Util.isUserAuthenticated(tokenUsername, recruitUnitUtil.Util.getLocalUser().token).then(angular.bind(this, function (result) {
        if (result == false) {
          recruitUnitUtil.Util.redirectUserToPath(recruitUnitUtil.Constants.PATH_HOME);
        } else if (result.success) {
          globals.userName = tokenUsername;
          return true;
        }
      }));
    } else {
      console.log("shiiiiiit, you ain't logged in");
      return true;
    }
  }
}
