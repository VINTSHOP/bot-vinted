FROM node:18.2.0-alpine

WORKDIR /app

COPY package.json /app

COPY . /app

RUN yarn

RUN yarn build

CMD yarn serve