// Modules, e.g. Webpack:

// console.log(process.env.NODE_ENV);
window.console.log('hoge3');

function signUp(name,mail,phone,password) {
    var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
    var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

    var poolData = {
        UserPoolId: '', // Your user pool id here
        ClientId: '' // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var attributeList = [];
    var dataEmail = {
        Name: 'email',
        Value: mail
    };
    var dataPhoneNumber = {
        Name: 'phone_number',
        Value: phone
    };

    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);

    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);

    userPool.signUp(
        name,
        password,
        attributeList,
        null, function (err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            var cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
        });
}

const myForm = document.querySelector('.signup');
myForm.addEventListener('submit', handleForm, false);

function handleForm(event){
    event.preventDefault();
    var name = document.getElementById('InputName').value;
    var mail = document.getElementById('InputEmail').value;
    var phone = document.getElementById('InputPhone').value;
    var password = document.getElementById('InputPassword').value;
    signUp(name,mail,phone,password);
    myForm.submit();
}

