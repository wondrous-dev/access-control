#!/bin/bash
if [ $# != 1 ] ; then
    echo "USAGE: $0 version"
    exit 1;
fi
cd ~/token-gating-service/


echo ">>>>>>>>>>>>>>Deploy image version $1 to Kubernetes..."


sed -i "s/token-gating-service:VERSION/token-gating-service:$1/g" ./prod_infra/token-gating-deployment.yaml

kubectl apply -f ./prod_infra/token-gating-deployment.yaml --record

sed -i "s/token-gating-service:$1/token-gating-service:VERSION/g" ./prod_infra/token-gating-deployment.yaml

cd ~/token-gating-service/prod_infra

exit 0