#!/bin/sh

docker pull pierreprinetti/certbot:latest

GetCert() {
        docker run \
          -v $(pwd)/data/letsencrypt/nginx-certs:/etc/letsencrypt \
          -e http_proxy=$http_proxy \
          -e domains="recruitunit.net, www.recruitunit.net" \
          -e email="stewartleachuk@hotmail.com" \
          -p 80:80 \
          -p 443:443 \
          --rm pierreprinetti/certbot:latest
}

echo "Getting certificates for recruitunit.net and www.recruitunit.net..."
GetCert

echo "Rebuilding frontend docker with certs..."
CONTAINERID="$(docker stop recruitunit-nginx)"
docker rm ${CONTAINERID}
docker build -t recruitunit-nginx -f Dockerfile-nginx .
docker run -d --name recruitunit-nginx -v $(pwd)/data/letsencrypt/nginx-certs:/etc/nginx/certs:ro -p 80:80 -p 443:443 recruitunit-nginx

echo "Done"