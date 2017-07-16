import template from './home.html';

class HomeController {
  constructor(loomApi, recruitUnitUtil, globals, $mdMedia) {
    "ngInject";
    console.log("in HomeController");
    this.loomApi = loomApi;
    this.recruitUnitUtil = recruitUnitUtil;
    this.globals = globals;
    this.roles = ['developer', 'recruiter'];
    this.user = {};
    this.$mdMedia = $mdMedia;

    this.recruitUnitUtil.Util.setTitle("Home");
  }

  createNewUser(){
    console.log("in createNewUser");
    console.log(this.user);//from the home.html form

    if(createUser.checkValidity()){ //createUser is form name
      //limitation of angular resource. Any parameters are placed on the url in the request, even for POST.
      //Having a key on the url is bad, so appending to data object.
      //ToDo: asses if the key is necesssary considering the server can be configured to only accept requests from specific hosts (via config > express.js)
      this.user.key = "123456789";
  
      this.loomApi.User.createNewUser(this.user, '/services/recruitunit/users/recruitUnitUserService.controller.js').then(angular.bind(this,function(result){
        console.log(result);
        result.success
          ?
          this.loomApi.User.signInUser(this.user.email, this.user.password).then(angular.bind(this,function(result, status, headers, config){
            result.success
              ?
              (this.recruitUnitUtil.Util.persistUserAuth(result.token, this.user.email),
                this.recruitUnitUtil.Util.redirectUserToPath(this.recruitUnitUtil.Constants.PATH_USER + this.user.email))
              :
              this.submitmessage = "Error. " + result.data.message;
            //console.log(this.submitmessage);
          }))
          :
          this.submitmessage = "Error. " + result.data.message;
      }));
    }
  }
}

export default {
  controller: HomeController,
  controllerAs: 'home',
  template: template,
  $canActivate: function(recruitUnitUtil, jwtHelper) {
    "ngInject";
    var userObj = recruitUnitUtil.Util.getLocalUser();

    if (userObj != "undefined" && userObj.token != null) {
      var token = jwtHelper.decodeToken(userObj.token);
      var tokenUsername = token.username;

      return recruitUnitUtil.Util.isUserAuthenticated(tokenUsername, recruitUnitUtil.Util.getLocalUser().token).then(angular.bind(this, function (result) {
        if (result.success) {
          let email = recruitUnitUtil.Util.getLocalUser().email;
          recruitUnitUtil.Util.redirectUserToPath(recruitUnitUtil.Constants.PATH_USER + email);
        } else {
          return true;
        }
      }));
    } else {
      return true;
    }
  }
}
