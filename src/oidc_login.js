var env = require('./env')
var cognito = require('./cognito');

export function init(){
  var auth = new cognito.ACA.CognitoAuth(env.AWS_OPENID_CONNECT);

  auth.userhandler = {
    onSuccess: function(result) {
      alert("Sign in success");
      //showSignedIn(result);
    },
    onFailure: function(err) {
      alert("Error!");
    }
  };
}


