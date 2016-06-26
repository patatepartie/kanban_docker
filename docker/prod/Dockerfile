# We need an alpine 3.4 to install tini from package, infortunatelly the current official nginx image
# is build on top of alpine 3.3.
# Their current master is already ready for 3.4 but they won't force push the docker image.
# So we're building it an pushing it on our own repository.
# https://github.com/nginxinc/docker-nginx/blob/345cc395d6a28a0148dc8270dde41a517f0e41a1/stable/alpine/Dockerfile
FROM patatepartie/nginx:1.10.1-alpine

RUN apk --no-cache add tini

COPY build /usr/share/nginx/html/
COPY nginx/nginx.conf /etc/nginx/

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["nginx", "-g", "daemon off;"]