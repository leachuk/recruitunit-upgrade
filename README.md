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

#Docker
*WIP. May find a better way of doing the build-latest-and-serve-from-Nginx*
*For Example, may be better generating the webpack output from the docker build step*
 
Currently there is no docker image to serve the RecruitUnit site as this is intended to be done via *nginx* docker

The site can also be served easily using the above local commands.

##Docker Webpack Build
Build image
```
docker build -t recruitunit .
```

Output built sources via webpack. Locate in local `target` volume dir
```
docker run -d --name recruitunit-build -v $(pwd)/target:/app/dist recruitunit
```

##Docker Nginx
The `target` directory is then copied to the Recruitunit Nginx container with
```
docker build -t recruitunit-nginx -f Dockerfile-nginx .
```

Run with
```
docker run -d --name recruitunit-nginx-test -p 80:80 recruitunit-nginx
```