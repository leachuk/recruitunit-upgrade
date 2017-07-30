RecruitUnit Site
============================

- Built with Angular and Angular Material using ES6 syntax (mostly)
- Serve and package with Webpack via gulp/npm
- Leverages loom rest server via the angular loom-api

#Local Development 

Run local development server via gulp
```
npm run serve
```

Run local distribution build via webpack. Outputs to `dist` directory

#Remote Deployment

From project root

```
git push prod-deploy master
```

To deploy the locally built `dist` files to remote project `target` directory 

```
npm run build

rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" --progress ./dist/ appadmin@45.63.84.90:/home/appadmin/projects/recruitunit/target
```

#Docker
*WIP. May find a better way of doing the build-latest-and-serve-from-Nginx*
*For Example, may be better generating the webpack output from the docker build step*
 
Currently there is no docker image to serve the RecruitUnit site as this is intended to be done via *nginx* docker

The site can also be served easily using the above local commands.

##Local Webpack Build
Outputs built files to /dist

```
npm run build
```

##Docker Webpack Build
Build image
```
docker build -t recruitunit .
```

Output built sources via webpack. Locate in local `target` volume dir
```
docker run -d --name recruitunit-build -v $(pwd)/dist:/app/dist recruitunit
```

##Docker Nginx
The `dist` directory is then copied to the Recruitunit Nginx container with
```
docker build -t recruitunit-nginx -f Dockerfile-nginx .
```

Run with
```
docker run -d --name recruitunit-nginx -p 80:80 recruitunit-nginx
```