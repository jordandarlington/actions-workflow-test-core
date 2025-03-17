const core = require('@actions/core');
const { Octokit } = require('@octokit/rest');
const { logMessage } = require('../../utils/logging');

async function run() {
    logMessage('validate-branch | START');

    try {
        const orgName = core.getInput('org-name');
        const repoName = core.getInput('repo-name');
        const baseBranch = core.getInput('base-branch');
        const token = core.getInput('github-token');

        const octokit = new Octokit({ auth: token });

        const { data } = await octokit.repos.getBranchProtection({
            owner: orgName,
            repo: repoName,
            branch: baseBranch,
        });

        if (data.lock_branch && data.lock_branch.enabled) {
            throw new Error(`${baseBranch} branch is locked`);
        } else {
            logMessage(`validate-branch | Check Branch Lock Status | SUCCESS`);
        }

    } catch (error) {
        core.setFailed(logMessage(`validate-branch | FAILURE | ${error.message}`));
        return;
    }

    logMessage('validate-branch | END');
}

run();