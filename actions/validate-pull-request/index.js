const core = require('@actions/core');
const github = require('@actions/github');
const { logMessage } = require('../../utils/logging');

async function run() {
    logMessage('validate-pull-request | START');

    try {
        const context = github.context;
        const pullRequest = context.payload.pull_request;

        if (!pullRequest) {
            throw new Error('No Pull Request found in the context');
        }
        logMessage(`validate-pull-request | PR Number: ${pullRequest.number}`);

        if (pullRequest.draft) {
            throw new Error('Pull Request is in draft state');
        }
        logMessage(`validate-pull-request | Check PR Draft Status | SUCCESS`);

        if (!pullRequest.title) {
            throw new Error('Pull Request title is required');
        }
        logMessage(`validate-pull-request | Check PR Title | SUCCESS`);

        if (!pullRequest.body || pullRequest.body.trim() === '') {
            throw new Error('Pull Request description is required');
        }
        logMessage(`validate-pull-request | Check PR Description | SUCCESS`);

    } catch (error) {
        core.setFailed(logMessage(`validate-pull-request | FAILURE | ${error.message}`));
        return;
    }

    logMessage('validate-pull-request | END');
}

run();