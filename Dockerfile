FROM node:latest

RUN mkdir /delicious

COPY ./package.json /delicious
COPY ./webpack.config.js /delicious

WORKDIR "/delicious"

RUN npm install

ENTRYPOINT ["npm", "start"]