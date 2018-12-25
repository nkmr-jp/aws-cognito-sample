var env = require('./env');
var ACI = require('amazon-cognito-identity-js');


var userPool = new ACI.CognitoUserPool({
    UserPoolId: env.AWS_COGNITO_USER_POOL_ID,
    ClientId: env.AWS_COGNITO_CLIENT_ID
});

function cognitoCallBack(err, result) {
    if (err) {
        alert(err.message || JSON.stringify(err));
        return;
    }
    var cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());
}

function signUp(name, mail, phone, password) {
    var attributeList = [
        new ACI.CognitoUserAttribute({Name: 'email', Value: mail}),
        new ACI.CognitoUserAttribute({Name: 'phone_number', Value: phone})
    ];

    userPool.signUp(name, password, attributeList, null,
        cognitoCallBack
    );
}

function handleSignUp(event) {
    event.preventDefault();
    signUp(
        document.getElementById('InputName').value,
        document.getElementById('InputEmail').value,
        document.getElementById('InputPhone').value,
        document.getElementById('InputPassword').value
    );
    // signUpForm.submit();
}

function initSignUp() {
    const signUpForm = document.getElementById('FormSingUp');
    signUpForm.addEventListener('submit', handleSignUp, false);
}

initSignUp();
