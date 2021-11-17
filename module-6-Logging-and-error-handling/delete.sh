docker stop module-6-db module-6-server
docker rm module-6-db module-6-server
docker rmi module-6-server postgres
rm -rf ./pgdata