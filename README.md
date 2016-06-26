Kanban App from [SurviveJS Tutorial](http://survivejs.com/webpack_react)

Nothing is special about the code itself. It was written following the tutorial.

It was, however, developed using [docker](https://www.docker.com/) and represent my current understanding of how to leverage `docker` for application development.

### Modern development

The code is written on the host but nothing, except `docker`, needs to be installed there.

It supports:
* code watching
* on the fly linting
* Hot Module Reloading (HMR)
* automatic runtime module installation with [npm-install-webpack-plugin](https://www.npmjs.com/package/npm-install-webpack-plugin)

It uses [docker-compose](https://docs.docker.com/compose/) to:
* easily launch the application in development mode
* execute command in container.

Two shell scripts are there to simplify the often used command:
* `docker/compose` which just calls `docker-compose` with the `compose.yml` file forwarding any arguments;
* `docker/run` which calls `docker/compose` with the `run --rm` command and forwarding arguments. It needs the name of the service as first argument.

On other projects, I've also added:
* scripts for each services, which just call the `docker/run` passing the name of the service first, and forwarding parameters;
* an `up` script, to calling `docker/compose` with the `up` command, since that's a often used command;
* `test` scripts for each services;
* `lint` scripts for each services.

The application is running in a single container, but it uses a named volume to store the node modules persistently.
Alternatively I could have used:
* a mounted host directory, is I needed it to be accessible from the host;
* a volume container, which was the way to have persistent non-host volumes, before the volume drivers were released.

Since we have only one service and one data volume, we don't really new `docker-compose`.
A couple simple shell scripts calling `docker` with the `-v` options would have worked too, but since this is an exercise, and I often have more complex setups, it shows what I would normally do.

To run the application, type:
```sh
./docker/compose up
```

and open `localhost:8080` in your browser.

The source code is mounted via host directory into the main container, so any change on the host is automatically picked up by the container.
`webpack` will automatically (and incrementally) rebuild everything it needs to, pushing the changes to the browser, so you can see the changes without even having to reload the browser.

If you need to install a new `npm` dev dependency, you can run:
```sh
./docker/run kanban npm i -D XXXX
```

Since we have `npm-install-webpack-plugin` installed, runtime dependencies don't need to be explicitly installed.
Just add them to `package.json` and let the plugin install them for you.
I've had glitches here, where I'd have to restart the container for the dependency to be picked up, but it was maybe a misconfiguration at some point.

That's it for development, let's look at the production setup.

### Optimized production

The production `docker` image is different of the development one, because it's optimised for production use.
It only contains the minimal amount of software to run the application, no development tools, or unused (but accessible) OS tools.

Since the `Kanban app` is a self-sufficient client-side application, it's made of only a few static files, and can be served by a web server like [nginx](http://nginx.org/).
Actually, we don't even need a web server, and could use a [CDN](https://en.wikipedia.org/wiki/Content_delivery_network), but we'll use `nginx`, for the purpose of this exercise.

The `docker` image, needs only contain the `nginx` binaries, config files, and the static assets for our application.
We still need to create our assets, and this process, close to a compilation, requires several tools.
Since we don't want to install them on the production image (makes it heavier and less secure), nor on our local machine, we'll use another container.

The "trick" is to have a build `docker` image, which contains all the necessary tools, and use the output of running this image as context for building our production image.
This build image will not be pushed to a repository, so it can even contain secrets (for a private artifact repository, for instance), as long as the code repository is private.
If you need to have a public repository, you could use [build time variables](https://docs.docker.com/engine/reference/commandline/build/#set-build-time-variables-build-arg) to provide them to the `docker build` process.
It does not have the drawbacks described [here](http://stackoverflow.com/questions/33621242/why-is-arg-in-a-dockerfile-not-recommended-for-passing-secrets) since the image is never used outside of the local machine.

Creating the production image (`kanban` here) looks like this:
```sh
docker build -t kanban-build -f docker/prod/Dockerfile.build .
docker run --rm kanban-build | docker build -t kanban -
```

We first build the `kanban-build` build image, then run a container for this image and pipe it's result to use a context for building our production one.

There is a shell script to automate this process: `docker/build-prod.sh`.

Currently (June 2016), the public [nginx](https://hub.docker.com/_/nginx/) image is based of of `alpine 3.3` but we need `3.4` which has a package for `tiny`.
The master branch of this repository works with `alpine 3.4`, so I checkout the code and build the image locally.
In the future, the production image should be based of of `nginx:1.10.2-alpine`, when it is ready.

One further optimization, would be to change the base image to use only the `nginx` modules we require (no `SSL` for instance), but that's out of my scope.

TODO:
security: user mapping
tiny
