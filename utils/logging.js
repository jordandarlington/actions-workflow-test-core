const core = require('@actions/core');

function logMessage(message) {
    const now = new Date();
    const formattedDate = now.toISOString().replace('T', ' ').substring(0, 19);
    core.info(`${formattedDate} | ${message}`);
}

module.exports = {
    logMessage
};