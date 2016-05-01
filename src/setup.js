global.debug = require('debug');
global.AppName = 'moment_in_time';
/*
 * ENABLE DEBUG MODE
 */
global.debug.enable(global.AppName + ':*');

global.GetDebug = function (name) {
    return global.debug(global.AppName + ':' + name);
}
const entryDebug = GetDebug('entry');
entryDebug('Found global, loading gobals');
global.$ = require('jquery');
global.jQuery = global.$;
global._ = require('lodash');
require('bootstrap-webpack');

export default GetDebug;

