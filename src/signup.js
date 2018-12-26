var cognito = require('./cognito');
var form = document.getElementById('FormSingUp');

export function init() {
    form.addEventListener('submit', _handleForm, false);
}

function _handleForm(event) {
    event.preventDefault();
    _runCognito(
        event,
        document.getElementById('InputName').value,
        document.getElementById('InputEmail').value,
        document.getElementById('InputPhone').value,
        document.getElementById('InputPassword').value
    );
}

function _runCognito(event, name, mail, phone, password) {
    var attributeList = [
        new cognito.ACI.CognitoUserAttribute({Name: 'email', Value: mail}),
        new cognito.ACI.CognitoUserAttribute({Name: 'phone_number', Value: phone})
    ];

    cognito.userPool.signUp(name, password, attributeList, null,
        _cognitoCallBack
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
