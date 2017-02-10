import template from "./formRead.html";

class Controller{
  constructor($cookies, $mdDialog, loomApi){
    "ngInject";
    console.log("FormReadController instantiated");
    console.log("jobDetailFormId passed in from dialog controller:" + this.jobDetailFormId);

    this.article = {"skills": []}; //Need to initialise for md-chips, otherwise an exception is thrown
    this.payFrequencyOptions = [
      {id: "Permanent", value: "annual salary"},
      {id: "Contract", value: "daily rate"}
    ];

    var modelId = "server/services/recruitunit/articles/recruitUnitContentService.controller.js";
    var model = "server/models/RecruitUnit.Job.All.js";
    var token = window.localStorage.getItem("writeon.authtoken");//handle no token

    loomApi.Article.getArticle(this.formId, modelId, model, token).then(angular.bind(this, function(result){
      console.log("get article:");
      console.log(result);
      this.article = result;
    }));
  }

  $routerOnActivate(next, previous){
    this.formId = next.params.id == null ? this.jobDetailFormId : next.params.id;
  }

  //make this a reusable service
  checkAuth(username, password){ //ToDo: does this need refactoring to use local storage rather than cookie?
    var authCookie = $cookies.get("writeon.authtoken"); //put cookie name into config var
    return typeof authCookie != 'undefined' ? authCookie : loomApi.User.signInUser(username, password).then(angular.bind(this, function(result){
      $cookies.put("writeon.authtoken", result.token);
      this.authToken = result.token; //required angular.bind to enable setting of scope variable within promise
    }));
  };

  cancelDialog(){
    console.log("cancelDialog");
    $mdDialog.hide();
  }
}

export default {
  controller: Controller,
  controllerAs: 'formRead',
  template: template
}
