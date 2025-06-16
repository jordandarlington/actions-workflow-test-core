const core = require('@actions/core');
const { Octokit } = require('@octokit/rest');
const { logMessage } = require('../../utils/logging');

async function run() {
    logMessage('lock-branch | START');

    try {
        const orgName = core.getInput('org-name');
        const repoName = core.getInput('repo-name');
        const branchName = core.getInput('branch-name');
        const token = core.getInput('github-token');

        const octokit = new Octokit({ auth: token });

        // Get current branch protection settings
        logMessage(`lock-branch | Getting current branch protection for ${branchName}`);
        let currentProtection = {};

        try {
            const { data } = await octokit.repos.getBranchProtection({
                owner: orgName,
                repo: repoName,
                branch: branchName,
            });
            currentProtection = data;
            logMessage(`lock-branch | Successfully retrieved branch protection settings`);
        } catch (error) {
            // If branch protection doesn't exist yet, handle gracefully
            logMessage(`lock-branch | No existing branch protection found: ${error.message}`);
        }

        // Update branch protection with lock enabled
        await octokit.repos.updateBranchProtection({
            owner: orgName,
            repo: repoName,
            branch: branchName,
            required_status_checks: currentProtection?.required_status_checks || null,
            enforce_admins: currentProtection?.enforce_admins?.enabled || false,
            required_pull_request_reviews: currentProtection?.required_pull_request_reviews || null,
            restrictions: currentProtection?.restrictions || null,
            required_linear_history: currentProtection?.required_linear_history?.enabled || false,
            allow_force_pushes: currentProtection?.allow_force_pushes?.enabled || false,
            allow_deletions: currentProtection?.allow_deletions?.enabled || false,
            lock_branch: true
        });

        logMessage(`lock-branch | Successfully locked branch ${branchName}`);

    } catch (error) {
        core.setFailed(logMessage(`lock-branch | FAILURE | ${error.message}`));
        return;

    } finally {
        logMessage('lock-branch | END');
    }
}

run();