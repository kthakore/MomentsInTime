# Moments In Time

Is an es6 google calendar app that I am making with:

* webpack
* react
* react-router
* enzyme
* airflux (es6 for of reflux)
* bootstrap
* hellojs (for oauth interfaces)


# To get started

Make a config.js in src/ that stores your google oauth clientID:

``
export default {
    'auth' : {
        'google' : {
            'clientID': 'xxxxxx'
        }
    }
};
``

Make sure you have the OAuth Redirect and origin set to:

* http://127.0.0.1:8080 and http://127.0.0.1:8080/


## Download deps:

* npm install
* npm start

Go to http://127.0.0.1:8080
