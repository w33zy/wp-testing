var env         = require('system').env,
    server      = env.WP_T_SERVER || 'http://wpt.docker',
    multiServer = env.WP_T_MULTI_SERVER || server,
    screenshots = env.CIRCLE_ARTIFACTS || '/home/mocha/screens',
    multisite   = env.WP_T_MULTISITE == 1 || false,
    isDelete    = env.WP_T_DELETE == 1 || false,
    wpVersion   = env.WP_VERSION || 'latest'

module.exports.multiServer = function () {
    return multiServer
}

module.exports.server = function () {
    return server
}

module.exports.anotherServer = function (name) {
    return multiServer.replace('wpt.docker', name + '.wpt.docker')
}

module.exports.screenshots = function () {
    return screenshots
}

module.exports.multisite = function () {
    return multisite
}

module.exports.isDelete = function () {
    return isDelete
}

function toVersion(version) {
    return (version + '.0.0.0').split('.').slice(0, 3).map(Number);
}

module.exports.isWp5Already = function () {
    if (wpVersion == 'latest') {
        return true;
    }

    return toVersion(wpVersion) >= toVersion('5.0.0');
}

module.exports.isWp53Already = function () {
    return toVersion(wpVersion) >= toVersion('5.3.0');
}

module.exports.isWp54Already = function () {
    if (wpVersion == 'latest') {
        return true;
    }

    return toVersion(wpVersion) >= toVersion('5.4.0');
}
