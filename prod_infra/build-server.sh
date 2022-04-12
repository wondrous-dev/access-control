#!/bin/bash
if [ $# != 1 ] ; then
    echo "USAGE: $0 version"
    exit 1;
fi

cd ~/token-gating-service/

docker build -t token-gating-service -f ./prod_infra/Dockerfile .

docker tag token-gating-service:latest gcr.io/wondrous-1587456307075/token-gating-service:$1

docker push gcr.io/wondrous-1587456307075/token-gating-service:$1

cd ~/token-gating-service/prod_infra

exit 0;