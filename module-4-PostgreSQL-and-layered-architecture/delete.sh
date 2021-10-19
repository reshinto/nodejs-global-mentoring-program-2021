docker stop module-4-db module-4-server
docker rm module-4-db module-4-server
docker rmi module-4-server postgres
rm -rf ./pgdata