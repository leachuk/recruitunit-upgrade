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

    ////// old version /////

    // this.article = {
    //   "jobDescription" : "",
    //   "currency": "",
    //   "roleType": "",
    //   "payBracketLower": null,
    //   "payBracketUpper": null,
    //   "locationDescription": "",
    //   "skills": [],
    //   "submitTo" : "",
    //   "authorEmail" : this.authenticatedUser.email,
    //   "published" : true
    // };

		this.article = { //initialise comparison rules article model
			"roleType": {
				"value": ["contract", "permanent"],
				"disabled": false,
				"rule": "assertStringContains"
			},
			"payBracketLower": {
				"value": 0,
				"disabled": false,
				"rule": "assertRangeGreaterThan"
			},
			"skills": {
				"value": [],
				"disabled": false,
				"rule": "assertArrayContains"
			},
			"authorEmail": this.authenticatedUser.email,
			"createdDate": Date.now(),
			"locationDescription": {
				"value": [],
				"disabled": false,
				"rule": "assertStringContains"
			},
			"published": true
		};

    this.currencylist = recruitUnitUtil.Currency;
  }

  // $routerOnActivate(next, previous){
  //   this.submitTo = next.params.guid;
	//
  //   this.authToken = this.recruitUnitUtil.Util.getLocalUser().token;
  //   if (this.authToken !== null){
  //     this.token = this.jwtHelper.decodeToken(this.authToken);
  //     this.tokenUsername = this.token.username;
  //     this.tokenRoles = this.token.roles;
  //     this.isDeveloper = this.tokenRoles.indexOf(this.recruitUnitUtil.Constants.RECRUITER_ROLE) == -1;
  //   } else {
  //     console.log("do not pass go!");
  //     this.showLoginModal();
  //   }
  // }

	$routerOnActivate(next, previous){
		var decodedToken = this.jwtHelper.decodeToken(this.recruitUnitUtil.Util.getLocalUser().token);
		var tokenUsername = decodedToken.username;
		var isComparisonFormEnabled = decodedToken.isComparisonFormEnabled;
		var requestedUsername = next.params.email;

		var controllerId = "/services/recruitunit/articles/recruitUnitContentService.controller.js";
		var model = "/models/RecruitUnit.JobDescription.js";
		var searchJson = {};
		searchJson.authorEmail = requestedUsername;

		this.recruitUnitUtil.Util.isUserAuthenticated(tokenUsername, this.recruitUnitUtil.Util.getLocalUser().token).then(angular.bind(this, function (result) {
			if (result == false) {
				this.recruitUnitUtil.Util.redirectUserToPath(this.recruitUnitUtil.Constants.PATH_HOME);// todo: get path from constant;
				this.recruitUnitUtil.Util.deleteUserAuth();
			} else if (tokenUsername != requestedUsername) {
				this.recruitUnitUtil.Util.redirectUserToPath(this.recruitUnitUtil.Constants.PATH_USER + tokenUsername);
			} else if (result.success) {
				if (isComparisonFormEnabled) { //update the default form if it exists
					this.loomApi.Article.search(controllerId, model, searchJson, this.recruitUnitUtil.Util.getLocalUser().token).then(angular.bind(this, function (searchResult) {
						console.log("get search:");
						console.log(searchResult);
						if (searchResult.length > 0) {
							this.article = searchResult[0];
						}
					}));
				}
			}
		}));
	}

	toggleRoleType(value){
		var roleTypeValue = this.article.roleType.value;
		var idx = roleTypeValue.indexOf(value);
		if (idx > -1) {
			roleTypeValue.splice(idx, 1);
		}
		else {
			roleTypeValue.push(value);
		};
	}

	existsRoleType(value){
		var roleTypeValue = this.article.roleType.value;
		return roleTypeValue.indexOf(value) > -1;
	}

	disableRoleType(){
		this.article.roleType.disabled = !this.article.roleType.disabled;
	}

	disablePayBracketLower(){
		this.article.payBracketLower.disabled = !this.article.payBracketLower.disabled;
	}

	disableSkills(){
		this.article.skills.disabled = !this.article.skills.disabled;
	}
	disableLocationDescription(){
		this.article.locationDescription.disabled = !this.article.locationDescription.disabled;
	}

	submitFormJobSpecDocument(){
		console.log("in submitFormJobSpecDocument");

		if(submitJobFromRecruiter.checkValidity()){ //comparisonRuleForm is form name
			console.log("model:");
			console.log(this.article);

			var authToken = this.recruitUnitUtil.Util.getLocalUser().token;
			var authEmail = this.recruitUnitUtil.Util.getLocalUser().email;
			var modelId = "/services/recruitunit/articles/recruitUnitContentService.controller.js";
			var modelType = "/models/RecruitUnit.JobDescription.js";
			if (this.article.hasOwnProperty("id")){//there is an existing comparisontest form, so update.
				delete this.article._rev;
				this.loomApi.Article.updateArticle(this.article.id, modelId, modelType, this.article, authToken).then(angular.bind(this, function (result) {
					console.log("Update result:");
					console.log(result);
					result.success ? this.recruitUnitUtil.Util.redirectUserToPath(this.recruitUnitUtil.Constants.PATH_USER + authEmail) : this.submitmessage = "Error. " + result.message;
				}));
			}else {
				this.loomApi.Article.createArticle(this.article, modelId, modelType, authToken).then(angular.bind(this,function(result){
					console.log("Save result:");
					console.log(result);
					result.success
						? (this.submitmessage = "Success",
								this.article = result.data,
								this.loomApi.User.updateUser(authEmail, {"isComparisonFormEnabled": true}, authToken).then(angular.bind(this,function(updateUserResult){
									if (updateUserResult.success){
										this.recruitUnitUtil.Util.deleteUserAuth();
										this.recruitUnitUtil.Util.persistUserAuth(updateUserResult.token, authEmail);
										this.recruitUnitUtil.Util.redirectUserToPath(this.recruitUnitUtil.Constants.PATH_USER + authEmail);
									}
								}))
						)
						:
						this.submitmessage = "Error. " + result.message;
				}));
			}
		}
	}

	cancelFormJobSpecDocument(){
		window.history.back();
	}

  /////// Old version ////////
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
