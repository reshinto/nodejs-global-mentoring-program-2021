docker stop module-5-db module-5-server
docker rm module-5-db module-5-server
docker rmi module-5-server postgres
rm -rf ./pgdata