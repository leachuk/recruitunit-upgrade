import template from "./formRead.html";

class Controller{
  constructor($cookies, $mdDialog, loomApi, recruitUnitUtil){
    "ngInject";
    this.$cookies = $cookies;
    this.$mdDialog = $mdDialog;
    this.loomApi = loomApi;

    console.log("FormReadController instantiated");
    console.log("jobDetailFormId passed in from dialog controller:" + this.jobDetailFormId);

    this.article = {"skills": []}; //Need to initialise for md-chips, otherwise an exception is thrown
    this.payFrequencyOptions = [
      {id: "Permanent", value: "annual salary"},
      {id: "Contract", value: "daily rate"}
    ];
		this.currencylist = recruitUnitUtil.Currency;

    var token = window.localStorage.getItem("writeon.authtoken");//handle no token
    this.loomApi.Article.getArticle(this.jobDetailFormId, token).then(angular.bind(this, function(result){
      console.log("get article:");
      console.log(result);
      this.article = result;
    }));
  }

  $routerOnActivate(next, previous){
    this.jobDetailFormId = next.params.id; //this is only activated when the route is directly navigated to. Not run from dialo opening.
  }

  //make this a reusable service
  checkAuth(username, password){ //ToDo: does this need refactoring to use local storage rather than cookie?
    var authCookie = this.$cookies.get("writeon.authtoken"); //put cookie name into config var
    return typeof authCookie != 'undefined' ? authCookie : this.loomApi.User.signInUser(username, password).then(angular.bind(this, function(result){
      this.$cookies.put("writeon.authtoken", result.token);
      this.authToken = result.token; //required angular.bind to enable setting of scope variable within promise
    }));
  };

  cancelDialog(){
    console.log("cancelDialog");
    this.$mdDialog.hide();
  }
}

export default {
  controller: Controller,
  controllerAs: 'formRead',
  template: template
}
