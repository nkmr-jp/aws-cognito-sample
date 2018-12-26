// require("aws-sdk/dist/aws-sdk");
// var AWS = window.AWS;
// var env = require('./env');
var cognito = require('./cognito');
var util = require('./util');
var form = document.getElementById('FormLogin');

export function init() {
    var cognitoUser = cognito.userPool.getCurrentUser();
    if (cognitoUser) {
        _showUserPage();
    } else {
        util.switchDisplayContainer('LoginContainer');
        form.addEventListener('submit', _handleForm, false);
    }
    window.console.log(cognitoUser);
}

function _handleForm(event) {
    event.preventDefault();
    _runCognito(
        document.getElementById('InputLoginUserName').value,
        document.getElementById('InputLoginPassword').value
    );
}

function _runCognito(username, password) {
    var authenticationData = {Username: username, Password: password,};
    var userData = {Username: username, Pool: cognito.userPool};
    var authenticationDetails = new cognito.ACI.AuthenticationDetails(authenticationData);
    var cognitoUser = new cognito.ACI.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            var accessToken = result.getAccessToken().getJwtToken();
            _showUserPage()
        },
        onFailure: function (err) {
            alert(err);
        },
        mfaRequired: function (codeDeliveryDetails) {
            var verificationCode = prompt('Please input verification code', '');
            cognitoUser.sendMFACode(verificationCode, this);
        }
    });
}

function _showUserPage() {
    util.switchDisplayContainer('UserPageContainer');
    document.getElementById('username').innerText = cognito.userPool.getCurrentUser().username
}