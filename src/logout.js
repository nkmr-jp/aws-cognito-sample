var util = require('./util');
var cognito = require('./cognito');

export function init() {
    util.switchDisplayContainer('LogoutContainer');
    var cognitoUser = cognito.userPool.getCurrentUser();
    cognitoUser.signOut();
}