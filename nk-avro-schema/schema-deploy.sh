#!/bin/bash

schema_registry="http://localhost:8081"
response=0

echo -e "\n Waiting for schema"

deploy_schemas() {
  cd ../avro/schemas

  fileList = $(ls *.avsc)
  for file in fileList; do
    fileContent=$()
  done

}

while [ $response -ne 200 ]; do
  response=$(curl --write-out %{http_code} --silent --output /dev/null ${schema_registry})
  if [ $response -eq 200 ]; then
    echo "schema OK. Time to deploy"
  fi
  sleep 1
done