FROM node:16

WORKDIR /usr/src/app



COPY . .


ENV PATH /usr/src/app/node_modules/.bin:$PATH
RUN npm install


CMD ["npm", "start"]