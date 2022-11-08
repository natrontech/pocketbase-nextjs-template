#!/bin/bash
# no verbose
set +x
# config
envFilename='.env.production'
nextFolder='./.next/'
function apply_path {

    env | grep ENV_ | while read -r line; do
        # split the variable into name and value
        configName=$(echo $line | cut -d'=' -f1)
        configValue=$(echo $line | cut -d'=' -f2)

        envValue=$(env | grep "^$configName=" | grep -oe '[^=]*$')
        # if config found
        if [ -n "$configValue" ] && [ -n "$envValue" ]; then
            # replace all
            echo "Replace: ${configValue} with: ${envValue}"
            find $nextFolder \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#$configValue#$envValue#g"
        fi
    done <$envFilename
}
apply_path
echo "Starting Nextjs"
exec "$@"
