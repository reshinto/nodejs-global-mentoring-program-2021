docker stop module-7-db module-7-server
docker rm module-7-db module-7-server
docker rmi module-7-server postgres
rm -rf ./pgdata