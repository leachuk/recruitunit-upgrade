import template from './comparisonRule.html';

class ComparisonRuleController {
  constructor(loomApi, recruitUnitUtil, jwtHelper, globals){
    "ngInject";
    console.log("ComparisonRuleController instantiated");
    this.loomApi = loomApi;
    this.recruitUnitUtil = recruitUnitUtil;
    this.jwtHelper = jwtHelper;
    this.globals = globals;

    recruitUnitUtil.Util.setTitle("Manage Comparison Rules");

    var localUser = recruitUnitUtil.Util.getLocalUser();
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
      "authorEmail": localUser.email,
      "createdDate": Date.now(),
      "locationDescription": {
        "value": [],
        "disabled": false,
        "rule": "assertStringContains"
      },
      "published": true
    };
  }

  $routerOnActivate(next, previous){
    var decodedToken = this.jwtHelper.decodeToken(this.recruitUnitUtil.Util.getLocalUser().token);
    var tokenUsername = decodedToken.username;
    var isComparisonFormEnabled = decodedToken.isComparisonFormEnabled;
    var requestedUsername = next.params.email;

    var controllerId = "/services/recruitunit/articles/recruitUnitContentService.controller.js";
    var model = "/models/RecruitUnit.ComparisonTest.js";
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

  submitComparisonRuleDocument(){
    console.log("in submitComparisonRuleDocument");

    if(comparisonRuleForm.checkValidity()){ //comparisonRuleForm is form name
      console.log("model:");
      console.log(this.article);

      var authToken = this.recruitUnitUtil.Util.getLocalUser().token;
      var authEmail = this.recruitUnitUtil.Util.getLocalUser().email;
      var modelId = "/services/recruitunit/articles/recruitUnitContentService.controller.js";
      var modelType = "/models/RecruitUnit.ComparisonTest.js";
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

  cancelComparisonRuleDocument(){
    window.history.back();
  }

}

export default {
  controller: ComparisonRuleController,
  controllerAs: 'comparisonRule',
  template: template,
  $canActivate: function($nextInstruction, recruitUnitUtil){
    "ngInject";
    console.log("in ComparisonRuleController canActivate");

    if (recruitUnitUtil.Util.isLocalUserAvailable()) {
      return true;
    } else {
      recruitUnitUtil.Util.redirectUserToPath(recruitUnitUtil.Constants.PATH_HOME);
    }

  }
}
