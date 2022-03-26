#!/bin/sh

schema_registry="http://localhost:8081"
response=0

while [ $response -ne 200 ]; do
  response=$(curl --write-out %{http_code} --silent --output /dev/null ${schema_registry})
  sleep 1
done

echo -e "\nSet compatibility for CHATHISTORY"
curl -X PUT -H "Content-Type: application/json" \
  --data '{"compatibility": "FULL"}' \
  ${schema_registry}/config/CHATHISTORY-value

  echo -e "\nSet compatibility for VIPCHATHISTORY"
  curl -X PUT -H "Content-Type: application/json" \
    --data '{"compatibility": "FULL"}' \
    ${schema_registry}/config/VIPCHATHISTORY-value

echo -e "\nSet compatibility for USERPROFILE"
curl -X PUT -H "Content-Type: application/json" \
  --data '{"compatibility": "FULL"}' \
  ${schema_registry}/config/USERPROFILE-value

echo -e "\nSet compatibility for UPAYMENTSTATUS"
curl -X PUT -H "Content-Type: application/json" \
  --data '{"compatibility": "FULL"}' \
  ${schema_registry}/config/UPAYMENTSTATUS-value

echo -e "\nSet compatibility for EVENTHISTORY"
curl -X PUT -H "Content-Type: application/json" \
  --data '{"compatibility": "FULL"}' \
  ${schema_registry}/config/EVENTHISTORY-value

echo -e "\nSet compatibility for EMAILVOUCHER"
curl -X PUT -H "Content-Type: application/json" \
  --data '{"compatibility": "FULL"}' \
  ${schema_registry}/config/EMAILVOUCHER-value

echo -e "\nSet compatibility for SLACKALERT"
curl -X PUT -H "Content-Type: application/json" \
  --data '{"compatibility": "FULL"}' \
  ${schema_registry}/config/SLACKALERT-value