const core = require('@actions/core');
const { Octokit } = require('@octokit/rest');
// const path = require('path');
// const { exec } = require('child_process');

async function run() {
    try {
        const orgName = core.getInput('org-name');
        const repoName = core.getInput('repo-name');
        const baseBranch = core.getInput('base-branch');
        const token = core.getInput('github-token');

        const octokit = new Octokit({ auth: token });
        // const scriptPath = path.resolve(__dirname, 'scripts/check-branch-lock.sh');

        // exec(`gh api repos/${orgName}/${repoName}/branches/${baseBranch}/protection --jq '.lock_branch.enabled' 2>/dev/null`, (error, stdout, stderr) => {
        // // exec(`${scriptPath} ${orgName} ${repoName} ${baseBranch}`, (error, stdout, stderr) => {
        //     if (error) {
        //         core.setFailed(`Error: ${error.message}`);
        //         return;
        //     }
        //     if (stderr) {
        //         core.setFailed(`stderr: ${stderr}`);
        //         return;
        //     }
        //     core.info(`stdout: ${stdout}`);
        // });

        const { data } = await octokit.repos.getBranchProtection({
            owner: orgName,
            repo: repoName,
            branch: baseBranch,
        });

        if (data.lock_branch && data.lock_branch.enabled) {
            core.setFailed(`${baseBranch} branch is locked`);
        } else {
            core.info(`${baseBranch} branch is not locked`);
        }

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();