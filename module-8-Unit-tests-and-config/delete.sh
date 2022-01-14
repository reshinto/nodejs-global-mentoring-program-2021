docker stop module-8-db module-8-server
docker rm module-8-db module-8-server
docker rmi module-8-server postgres
rm -rf ./pgdata