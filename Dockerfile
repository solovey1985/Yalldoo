### STAGE 1: Build ###
FROM yalldoo/yalldoo.spa:base as builder

RUN mkdir /app

COPY ./src ./app

COPY ./package.json ./app

COPY server.js ./app

WORKDIR /app

RUN npm install --include=dev

RUN npm run build-prod

RUN rm -r ./app/dist/assets/scss 

CMD node server.js

EXPOSE 80 443