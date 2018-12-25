var ACI = require('amazon-cognito-identity-js');
var getById = document.getElementById;

var userPool = new ACI.CognitoUserPool({
    UserPoolId: '', // Your user pool id here
    ClientId: '' // Your client id here
});

function signUp(name, mail, phone, password) {
    var attributeList = [
        new ACI.CognitoUserAttribute({Name: 'email', Value: mail}),
        new ACI.CognitoUserAttribute({Name: 'phone_number', Value: phone})
    ];

    userPool.signUp(name, password, attributeList, null,
        function (err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            var cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
        }
    );
}

const signUpForm = document.querySelector('.signup');
signUpForm.addEventListener('submit', handleSignUp, false);

function handleSignUp(event) {
    event.preventDefault();
    var name = getById('InputName').value;
    var mail = getById('InputEmail').value;
    var phone = getById('InputPhone').value;
    var password = getById('InputPassword').value;
    signUp(name, mail, phone, password);
    signUpForm.submit();
}
