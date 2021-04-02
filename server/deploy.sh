#!/bin/bash

echo What should the version be?
read VERSION

docker build -t lhowsam/ts-node-starter:$VERSION .
docker push lhowsam/ts-node-starter:$VERSION
ssh root@ip-addr "docker pull lhowsam/ts-node-starter:$VERSION && docker tag lhowsam/ts-node-starter:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"
