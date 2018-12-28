var env = require('./env');
export var ACI = require('amazon-cognito-identity-js');
export var ACA = require('amazon-cognito-auth-js');
export var userPool = new ACI.CognitoUserPool({
    UserPoolId: env.AWS_COGNITO_USER_POOL_ID,
    ClientId  : env.AWS_COGNITO_CLIENT_ID
});
export var OIDC_LOGIN_URL = 'https://'
    + env.AWS_OPENID_CONNECT.AppWebDomain
    + '/login?response_type=code&cliend_id='
    + env.AWS_COGNITO_CLIENT_ID
    + '&redirect_uri='
    + env.AWS_OPENID_CONNECT.RedirectUriSignIn

