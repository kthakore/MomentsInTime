import {Action} from 'airflux';
function createActions(actions) {
    var a = {};

    _.each(actions, function (action) {
        a[action] = new Action().asFunction;
    });
    return a;
}

const Actions = createActions([
    "GoogleSignIn",
    "SignOut"
]);



export default Actions;
