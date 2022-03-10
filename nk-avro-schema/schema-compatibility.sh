#!/bin/sh

schema_registry="http://localhost:8081"
response=0

while [ $response -ne 200 ]; do
  response=$(curl --write-out %{http_code} --silent --output /dev/null ${schema_registry})
  sleep 1
done

echo -e "\nSet compatibility for PROCESS_GI_USER"
curl -X PUT -H "Content-Type: application/json" \
  --data '{"compatibility": "FULL"}' \
  ${schema_registry}/config/PROCESS_GI_USER-value


echo -e "\nSet compatibility for PROCESS_GI_USER"
curl -X PUT -H "Content-Type: application/json" \
  --data '{"compatibility": "FULL"}' \
  ${schema_registry}/config/PROCESS_LI_USER-value