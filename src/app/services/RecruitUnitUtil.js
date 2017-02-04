class RecruitUnitUtil {

  constructor($resource, $location, $window, loomApi, jwtHelper) {
    "ngInject";
    this.$resource = $resource;
    this.$location = $location;
    this.$window = $window;
    this.loomApi = loomApi;
    this.jwtHelper = jwtHelper;
  }

  get Constants(){
    return RecruitUnitUtil.consts;
  }

  get Util(){
    //not an ideal object construct, but saves refactoring all usages. At least until I find a better way
    let $resource = this.$resource;
    let $location = this.$location;
    let $window = this.$window;
    let loomApi = this.loomApi;
    let jwtHelper = this.jwtHelper;

    return {
      setTitle(title){
        document.title = "Recruit Unit - " + title;
      },

      getLocalUser(){
        var user = {
          email: window.localStorage.getItem("writeon.username"),
          token: window.localStorage.getItem("writeon.authtoken")
        };
        return user;
      },

      isUserAuthenticated(username, token){
        return loomApi.User.getUser(username, token).then(function(result){
          return new Promise(function(resolve, reject) {
            if (result.success) {
              resolve(result);
            } else {
              reject(false);
            }
          });
        }).catch(function(err) {
          console.log("Exception: isUserAuthenticated");
          return false;
        });
      },

      persistUserAuth(token, username){
        window.localStorage.setItem("writeon.authtoken", token);
        window.localStorage.setItem("writeon.username", username);
      },

      deleteUserAuth(){
        window.localStorage.removeItem("writeon.authtoken");
        window.localStorage.removeItem("writeon.username");
      },

      redirectUserToPath(redirectToPath){
        console.log("redirectUserToPath, redirect to :" + redirectToPath);
        $window.location.assign(redirectToPath);
      },

      isLocalUserAvailable(){
        var localUser = this.getLocalUser();
        return (typeof localUser.email !== 'undefined' && localUser.email !== null) && (typeof localUser.token !== 'undefined' && localUser.token !== null);
      },

      getUserRoles(){
        var roles = "";
        if (this.isLocalUserAvailable()){
          var token = jwtHelper.decodeToken(this.getLocalUser().token);
          roles = token.roles;
        }
        return roles;
      },

      isLocalUserLoggedIn(){
        var localUser = this.getLocalUser();
        var isLoggedIn = false;
        if (this.isLocalUserAvailable()){ //check if details are set
          console.log("The local user details are present");
          isLoggedIn = !jwtHelper.isTokenExpired(localUser.token);
        }
        return isLoggedIn;
      }
    }
  }

}

RecruitUnitUtil.consts = Object.freeze({
  'APP_PROTOCOL': "http://",
  'APP_HOST': '127.0.0.1',
  'APP_PORT': '8080',
  'DEVELOPER_ROLE': 'developer',
  'RECRUITER_ROLE': 'recruiter',
  'PATH_HOME': '/home',
  'PATH_USER': '/user/',
  'PATH_COMPARISONRULESFORM': '/comparisonrules'
});

export default RecruitUnitUtil;