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

  get Currency(){
    return RecruitUnitUtil.currency;
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
  'APP_HOST': 'localhost',
  'APP_PORT': '3000',
  'DEVELOPER_ROLE': 'developer',
  'RECRUITER_ROLE': 'recruiter',
  'PATH_HOME': '/home',
  'PATH_USER': '/user/',
  'PATH_COMPARISONRULESFORM': '/comparisonrules'
});

RecruitUnitUtil.currency = Object.freeze([
	{ id: "AED", description: "UAE Dirham" },
	{ id: "AFN", description: "Afghani" },
	{ id: "ALL", description: "Lek Lek" },
	{ id: "AMD", description: "Armenian Dram" },
	{ id: "ANG", description: "Netherlands Antillian Guilder" },
	{ id: "AOA", description: "Kwanza" },
	{ id: "ARS", description: "Argentine Peso" },
	{ id: "AUD", description: "Australian Dollar" },
	{ id: "AWG", description: "Aruban Guilder" },
	{ id: "AZN", description: "Azerbaijanian Manat" },
	{ id: "BAM", description: "Convertible Marks" },
	{ id: "BBD", description: "Barbados Dollar" },
	{ id: "BDT", description: "Taka" },
	{ id: "BGN", description: "Bulgarian Lev" },
	{ id: "BHD", description: "Bahraini Dinar" },
	{ id: "BIF", description: "Burundi Franc" },
	{ id: "BMD", description: "Bermudian Dollar" },
	{ id: "BND", description: "Brunei Dollar" },
	{ id: "BOB", description: "BOV Boliviano Mvdol" },
	{ id: "BRL", description: "Brazilian Real" },
	{ id: "BSD", description: "Bahamian Dollar" },
	{ id: "BWP", description: "Pula" },
	{ id: "BYR", description: "Belarussian Ruble" },
	{ id: "BZD", description: "Belize Dollar" },
	{ id: "CAD", description: "Canadian Dollar" },
	{ id: "CDF", description: "Congolese Franc" },
	{ id: "CHF", description: "Swiss Franc" },
	{ id: "CLP", description: "CLF Chilean Peso Unidades de fomento" },
	{ id: "CNY", description: "Yuan Renminbi" },
	{ id: "COP", description: "COU Colombian Peso Unidad de Valor Real" },
	{ id: "CRC", description: "Costa Rican Colon" },
	{ id: "CUP", description: "CUC Cuban Peso Peso Convertible" },
	{ id: "CVE", description: "Cape Verde Escudo" },
	{ id: "CZK", description: "Czech Koruna" },
	{ id: "DJF", description: "Djibouti Franc" },
	{ id: "DKK", description: "Danish Krone" },
	{ id: "DOP", description: "Dominican Peso" },
	{ id: "DZD", description: "Algerian Dinar" },
	{ id: "EEK", description: "Kroon" },
	{ id: "EGP", description: "Egyptian Pound" },
	{ id: "ERN", description: "Nakfa" },
	{ id: "ETB", description: "Ethiopian Birr" },
	{ id: "EUR", description: "Euro" },
	{ id: "FJD", description: "Fiji Dollar" },
	{ id: "FKP", description: "Falkland Islands Pound" },
	{ id: "GBP", description: "Pound Sterling" },
	{ id: "GEL", description: "Lari" },
	{ id: "GHS", description: "Cedi" },
	{ id: "GIP", description: "Gibraltar Pound" },
	{ id: "GMD", description: "Dalasi" },
	{ id: "GNF", description: "Guinea Franc" },
	{ id: "GTQ", description: "Quetzal" },
	{ id: "GYD", description: "Guyana Dollar" },
	{ id: "HKD", description: "Hong Kong Dollar" },
	{ id: "HNL", description: "Lempira" },
	{ id: "HRK", description: "Croatian Kuna" },
	{ id: "HTG", description: "USD	Gourde US Dollar" },
	{ id: "HUF", description: "Forint" },
	{ id: "IDR", description: "Rupiah" },
	{ id: "ILS", description: "New Israeli Sheqel" },
	{ id: "INR", description: "Indian Rupee" },
	{ id: "INR", description: "BTN Indian Rupee Ngultrum" },
	{ id: "IQD", description: "Iraqi Dinar" },
	{ id: "IRR", description: "Iranian Rial" },
	{ id: "ISK", description: "Iceland Krona" },
	{ id: "JMD", description: "Jamaican Dollar" },
	{ id: "JOD", description: "Jordanian Dinar" },
	{ id: "JPY", description: "Yen" },
	{ id: "KES", description: "Kenyan Shilling" },
	{ id: "KGS", description: "Som" },
	{ id: "KHR", description: "Riel" },
	{ id: "KMF", description: "Comoro Franc" },
	{ id: "KPW", description: "North Korean Won" },
	{ id: "KRW", description: "Won" },
	{ id: "KWD", description: "Kuwaiti Dinar" },
	{ id: "KYD", description: "Cayman Islands Dollar" },
	{ id: "KZT", description: "Tenge" },
	{ id: "LAK", description: "Kip" },
	{ id: "LBP", description: "Lebanese Pound" },
	{ id: "LKR", description: "Sri Lanka Rupee" },
	{ id: "LRD", description: "Liberian Dollar" },
	{ id: "LTL", description: "Lithuanian Litas" },
	{ id: "LVL", description: "Latvian Lats" },
	{ id: "LYD", description: "Libyan Dinar" },
	{ id: "MAD", description: "Moroccan Dirham" },
	{ id: "MDL", description: "Moldovan Leu" },
	{ id: "MGA", description: "Malagasy Ariary" },
	{ id: "MKD", description: "Denar" },
	{ id: "MMK", description: "Kyat" },
	{ id: "MNT", description: "Tugrik" },
	{ id: "MOP", description: "Pataca" },
	{ id: "MRO", description: "Ouguiya" },
	{ id: "MUR", description: "Mauritius Rupee" },
	{ id: "MVR", description: "Rufiyaa" },
	{ id: "MWK", description: "Kwacha" },
	{ id: "MYR", description: "Malaysian Ringgit" },
	{ id: "NGN", description: "Naira" },
	{ id: "NIO", description: "Cordoba Oro" },
	{ id: "NOK", description: "Norwegian Krone" },
	{ id: "NPR", description: "Nepalese Rupee" },
	{ id: "NZD", description: "New Zealand Dollar" },
	{ id: "OMR", description: "Rial Omani" },
	{ id: "PAB", description: "USD Balboa US Dollar" },
	{ id: "PEN", description: "Nuevo Sol" },
	{ id: "PGK", description: "Kina" },
	{ id: "PHP", description: "Philippine Peso Php" },
	{ id: "PKR", description: "Pakistan Rupee" },
	{ id: "PLN", description: "Zloty" },
	{ id: "PYG", description: "Guarani Gs" },
	{ id: "QAR", description: "Qatari Rial" },
	{ id: "RON", description: "New Leu lei" },
	{ id: "RSD", description: "Serbian Dinar" },
	{ id: "RUB", description: "Russian Ruble" },
	{ id: "RWF", description: "Rwanda Franc" },
	{ id: "SAR", description: "Saudi Riyal" },
	{ id: "SBD", description: "Solomon Islands Dollar" },
	{ id: "SCR", description: "Seychelles Rupee" },
	{ id: "SDG", description: "Sudanese Pound" },
	{ id: "SEK", description: "Swedish Krona" },
	{ id: "SGD", description: "Singapore Dollar" },
	{ id: "SHP", description: "Saint Helena Pound" },
	{ id: "SLL", description: "Leone" },
	{ id: "SOS", description: "Somali Shilling" },
	{ id: "SRD", description: "Surinam Dollar" },
	{ id: "STD", description: "Dobra" },
	{ id: "SVC", description: "USD El Salvador Colon US Dollar" },
	{ id: "SYP", description: "Syrian Pound" },
	{ id: "SZL", description: "Lilangeni" },
	{ id: "THB", description: "Baht" },
	{ id: "TJS", description: "Somoni" },
	{ id: "TMT", description: "Manat" },
	{ id: "TND", description: "Tunisian Dinar" },
	{ id: "TOP", description: "Pa'anga" },
	{ id: "TRY", description: "Turkish Lira" },
	{ id: "TTD", description: "Trinidad and Tobago Dollar" },
	{ id: "TWD", description: "New Taiwan Dollar" },
	{ id: "TZS", description: "Tanzanian Shilling" },
	{ id: "UAH", description: "Hryvnia" },
	{ id: "UGX", description: "Uganda Shilling" },
	{ id: "USD", description: "US Dollar" },
	{ id: "UZS", description: "Uzbekistan Sum" },
	{ id: "VEF", description: "Bolivar Fuerte" },
	{ id: "VND", description: "Dong" },
	{ id: "VUV", description: "Vatu" },
	{ id: "WST", description: "Tala" },
	{ id: "XCD", description: "East Caribbean Dollar" },
	{ id: "YER", description: "Yemeni Rial" },
	{ id: "ZAR", description: "Rand" },
	{ id: "ZAR", description: "LSL Rand Loti" },
	{ id: "ZAR", description: "NAD Rand Namibia Dollar" },
	{ id: "ZMK", description: "Zambian Kwacha" },
	{ id: "ZWL", description: "Zimbabwe Dollar" }
]);

export default RecruitUnitUtil;