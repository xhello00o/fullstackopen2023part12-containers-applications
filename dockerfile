FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci
ENV DEBUG=fullstackopen2023part12-containers-applications:*

USER node
CMD npm start