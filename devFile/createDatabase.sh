#! /bin/sh

set -e

if [ -n "${GITLAB_CI}" ]; then
    export DATABASE_SCHEMA_NAME="BDRTest-${CI_JOB_ID}"
elif [ -n "${JENKINS_URL}" ]; then
    export DATABASE_SCHEMA_NAME=`echo "BDRTest-${BUILD_NUMBER}-${JOB_NAME}" | sed -e "s/[#\/]/-/g" | sed -e "s/%2F/-/g" | cut -c -64`
else
    export DATABASE_SCHEMA_NAME="BDR_final_test"
fi

mysql --host=${SYMFONY__DATABASE__HOST} --user=root --password=Newone123 --execute="DROP SCHEMA IF EXISTS \`${DATABASE_SCHEMA_NAME}\`;"
php bin/console --env=test doctrine:database:create
php bin/console --env=test doctrine:schema:create
php bin/console --env=test --group=TestFixture doctrine:fixtures:load 


