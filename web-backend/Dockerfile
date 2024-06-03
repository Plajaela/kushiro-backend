FROM node:18-alpine

WORKDIR /app


USER root

COPY package*.json /app/

RUN npm install

COPY . /app/

RUN npm run build

CMD [ "npm", "start" ]