/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 666:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const core = __nccwpck_require__(428);

function logMessage(message) {
    const now = new Date();
    const formattedDate = now.toISOString().replace('T', ' ').substring(0, 19);
    core.info(`${formattedDate} | ${message}`);
}

module.exports = {
    logMessage
};

/***/ }),

/***/ 428:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 49:
/***/ ((module) => {

module.exports = eval("require")("@octokit/rest");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
const core = __nccwpck_require__(428);
const { Octokit } = __nccwpck_require__(49);
const { logMessage } = __nccwpck_require__(666);

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
module.exports = __webpack_exports__;
/******/ })()
;