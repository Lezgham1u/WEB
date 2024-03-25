#! /bin/sh

./bin/php-cs-fixer fix --using-cache=no --rules=@Symfony --show-progress=none --diff --dry-run src | grep --quiet -- '---------- begin diff ----------'
if [ $? -eq 1 ]; then
    exit 0
else
    ./bin/php-cs-fixer fix --using-cache=no --rules=@Symfony --show-progress=none --diff --dry-run src
    exit 1
fi

