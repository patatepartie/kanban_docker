FROM node:5.6.0

ENV TINI_VERSION v0.9.0
ENV TINI_PATH /usr/local/bin/tini
RUN curl -sL https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini > $TINI_PATH && \
    chmod +x $TINI_PATH

COPY docker/dev/entrypoint.sh /usr/local/bin/entrypoint

ENV PORT 8080
WORKDIR /kanban
EXPOSE ${PORT}
ENTRYPOINT ["tini", "--", "entrypoint"]
CMD ["npm", "start"]