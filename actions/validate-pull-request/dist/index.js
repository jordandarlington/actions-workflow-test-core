/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 966:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const core = __nccwpck_require__(428);
const github = __nccwpck_require__(300);
const { logMessage } = __nccwpck_require__(666);

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

module.exports = run;

run();

/***/ }),

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

/***/ 300:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(966);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;