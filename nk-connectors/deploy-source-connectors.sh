#!/bin/bash

connector_url="http://localhost:8083/connectors"

deploy_source_connectors() {
  cd ./source
  fileList=$(ls *.json)
  for file in $fileList; do
    echo -e "Creating $file\nURL:${connector_url}"
    curl -XPOST -H "Content-Type: application/json" -H "Accept: application/json" -d "@${file}" "${connector_url}"
    echo "\n"
  done
}

echo "Checking health of Connect service"
res=$(curl -s -o /dev/null -w %{http_code} ${connector_url})
if [ $res -eq 200 ]; then
  echo "Connector OK. Deploying..."
  deploy_source_connectors
else
  echo "Error with connector"
  exit 1
fi