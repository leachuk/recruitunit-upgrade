import template from './formSubmit.html';

class FormSubmitController {
  constructor($location, loomApi, recruitUnitUtil, jwtHelper, globals){
    "ngInject";
    console.log("FormSubmitController instantiated");

    this.$location = $location;
    this.loomApi = loomApi;
    this.recruitUnitUtil = recruitUnitUtil;
    this.jwtHelper = jwtHelper;
    this.globals = globals;

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
    this.token = this.jwtHelper.decodeToken(this.authToken);
    this.tokenUsername = this.token.username;
    this.tokenRoles = this.token.roles;
    this.isDeveloper = this.tokenRoles.indexOf(this.recruitUnitUtil.Constants.RECRUITER_ROLE) == -1;

    if(!this.isDeveloper) {
      this.loomApi.User.getUserFromGuid(this.submitTo, this.authToken).then(angular.bind(this, function (result) {
        this.user = result;
      }));
    }
  }

  submitJobToCandidate(){
    console.log("in submitJobToCandidate");
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
}

export default{
  controller: FormSubmitController,
  controllerAs: 'formSubmit',
  template: template,
  $canActivate: function(recruitUnitUtil, jwtHelper, globals) {
    "ngInject";
    var token = jwtHelper.decodeToken(recruitUnitUtil.Util.getLocalUser().token); //todo: handle no token
    var userRoles = token.roles;
    var tokenUsername = token.username;

    return recruitUnitUtil.Util.isUserAuthenticated(tokenUsername, recruitUnitUtil.Util.getLocalUser().token).then(angular.bind(this,function(result) {
      if (result == false) {
        recruitUnitUtil.Util.redirectUserToPath(recruitUnitUtil.Constants.PATH_HOME);
      } else if (result.success) {
        globals.userName = tokenUsername;
        return true;
      }
    }));
  }
}
