#! /bin/sh

set -e

if [ -n "${GITLAB_CI}" ]; then
    export DATABASE_SCHEMA_NAME="BDRTest-${CI_JOB_ID}"
else
    export DATABASE_SCHEMA_NAME="BDRTest"
fi

export SYMFONY__DATABASE__NAME="${DATABASE_SCHEMA_NAME}"

bin/simple-phpunit --coverage-text --coverage-html=tests/results/coverage --colors=never --log-junit=tests/results/PhpUnitDataPackageManager.xml --exclude-group=multisite

