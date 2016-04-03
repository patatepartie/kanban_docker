FROM node:5.6.0

ENV TINI_VERSION v0.9.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

COPY docker/dev/entrypoint.sh /entrypoint.sh

ENV PORT 8080
WORKDIR /kanban
EXPOSE ${PORT}
ENTRYPOINT ["/tini", "--", "/entrypoint.sh"]
CMD ["npm", "start"]