FROM node:carbon

RUN npm install webpack -g
RUN npm install forever -g

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ADD package.json /usr/src/app/package.json

RUN npm install

EXPOSE 3000
CMD [ "npm", "run", "serve:local" ]
