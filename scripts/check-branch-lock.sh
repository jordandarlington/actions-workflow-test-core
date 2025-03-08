#!/bin/bash
ORG_NAME=$1
REPO_NAME=$2
BRANCH_NAME=$3

branch_lock=$(
    gh api \
    repos/$ORG_NAME/$REPO_NAME/branches/$BRANCH_NAME/protection \
    --jq '.lock_branch.enabled' \
    2>/dev/null
)

if [ "$branch_lock" = "true" ]; then
    echo "$(date "+%F %H:%M:%S") | check-branch-lock.sh | $BRANCH_NAME is locked"
    exit 1
elif [ "$branch_lock" = "false" ]; then
    echo "$(date "+%F %H:%M:%S") | check-branch-lock.sh | $BRANCH_NAME is not locked"
    exit 0
else
    echo "$(date "+%F %H:%M:%S") | check-branch-lock.sh | $BRANCH_NAME lock status could not be determined"
    exit 1
fi