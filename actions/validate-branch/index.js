const core = require('@actions/core');
const { exec } = require('child_process');

async function run() {
    try {
        const orgName = core.getInput('org-name');
        const repoName = core.getInput('repo-name');
        const baseBranch = core.getInput('base-branch');

        exec(`./scripts/check-branch-lock.sh ${orgName} ${repoName} ${baseBranch}`, (error, stdout, stderr) => {
            if (error) {
                core.setFailed(`Error: ${error.message}`);
                return;
            }
            core.info(`stdout: ${stdout}`);
        });

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();