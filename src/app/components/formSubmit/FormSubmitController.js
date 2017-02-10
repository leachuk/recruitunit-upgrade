import template from './formSubmit.html';

class FormSubmitController {
  controller($location, loomApi, recruitUnitUtil, jwtHelper, globals){
    "ngInject";
    console.log("FormSubmitController instantiated");
    recruitUnitUtil.Util.setTitle("Submit Form Page");

    var authToken = recruitUnitUtil.Util.getLocalUser().token;
    var token = jwtHelper.decodeToken(authToken);
    var tokenUsername = token.username;
    var tokenRoles = token.roles;

    this.authenticatedUser = recruitUnitUtil.Util.getLocalUser();

    this.payFrequencyOptions = [
      {id: "Permanent", value: "annual salary"},
      {id: "Contract", value: "daily rate"}
    ];
    this.article = {
      "jobDescription" : "",
      "roleType": "",
      "payBracketLower": null,
      "payBracketUpper": null,
      "locationDescription": "",
      "skills": [],
      "submitTo" : this.submitTo,
      "authorEmail" : this.authenticatedUser.email,
      "published" : true
    };
  }

  $routerOnActivate(next, previous){
    this.submitTo = next.params.guid;
    this.isDeveloper = tokenRoles.indexOf(recruitUnitUtil.Constants.RECRUITER_ROLE) == -1;
    if(!this.isDeveloper) {
      loomApi.User.getUserFromGuid(this.submitTo, authToken).then(angular.bind(this, function (result) {
        globals.user = result;
      }));
    }
  }

  submitJobToCandidate(){
    console.log("in submitJobToCandidate");
    var authToken = recruitUnitUtil.Util.getLocalUser().token;

    if(submitJobFromRecruiter.checkValidity() && typeof authToken != 'undefined'){ //submitJobFromRecruiter is form name
      console.log("model:");
      console.log(this.article);

      loomApi.Article.createJobSubmission(this.article, authToken).then(angular.bind(this,function(saveResult){
        console.log("result:");
        console.log(saveResult);

        saveResult.success ? $location.path("/user/" + this.authenticatedUser.email) : this.submitmessage = "Error. " + saveResult.message;
      }));
    }
  }
}

export default{
  controller: FormSubmitController,
  controllerAs: 'formSubmit',
  template: template,
  $canActivate: function(recruitUnitUtil, jwtHelper, globals) {
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
