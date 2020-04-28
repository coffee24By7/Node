FROM node:latest

RUN mkdir /src

COPY ./package.json /src
COPY ./webpack.config.js /src
COPY ./tsconfig.json /src
COPY ./variables.env /src
COPY ./webpack.config.js /src
COPY ./start.sh /src

WORKDIR "/src"

RUN npm install

# ENTRYPOINT ["npm", "run", "start:dev"]
CMD ["./start.sh"]