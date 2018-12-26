var env = require('./env');
var ACI = require('amazon-cognito-identity-js');
var userPool = new ACI.CognitoUserPool({
    UserPoolId: env.AWS_COGNITO_USER_POOL_ID,
    ClientId: env.AWS_COGNITO_CLIENT_ID
});
var form = document.getElementById('FormSingUp');

export function initSignUp() {
    form.addEventListener('submit', _handleSignUp, false);
}

function _signUp(event, name, mail, phone, password) {
    var attributeList = [
        new ACI.CognitoUserAttribute({Name: 'email', Value: mail}),
        new ACI.CognitoUserAttribute({Name: 'phone_number', Value: phone})
    ];

    userPool.signUp(name, password, attributeList, null,
        _cognitoCallBack
    );
}

function _handleSignUp(event) {
    event.preventDefault();
    _signUp(
        event,
        document.getElementById('InputName').value,
        document.getElementById('InputEmail').value,
        document.getElementById('InputPhone').value,
        document.getElementById('InputPassword').value
    );
}

function _cognitoCallBack(err, result) {
    if (err) {
        alert(err.message || JSON.stringify(err));
        return;
    }
    var cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());
    form.submit()
}
