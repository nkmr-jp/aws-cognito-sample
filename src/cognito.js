var env = require('./env');
export var ACI = require('amazon-cognito-identity-js');
export var userPool = new ACI.CognitoUserPool({
    UserPoolId: env.AWS_COGNITO_USER_POOL_ID,
    ClientId: env.AWS_COGNITO_CLIENT_ID
});