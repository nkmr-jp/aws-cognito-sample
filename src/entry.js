var login = require('./login');
var signup = require('./signup');
var confirm = require('./confirm');
var complete = require('./complete');
var logout = require('./logout');

function rooter() {
    switch (window.location.hash) {
        case '#':
        case '':
            login.init();
            break;
        case '#signup':
            signup.init();
            break;
        case '#confirm':
            confirm.init();
            break;
        case '#complete':
            complete.init();
            break;
        case '#logout':
            logout.init();
            break;
    }
}

window.onhashchange = rooter;
window.onload = rooter;