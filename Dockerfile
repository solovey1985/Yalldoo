FROM yalldoo/yalldoo.spa:base

RUN mkdir /app

COPY . ./app

WORKDIR /app

RUN npm install --include=dev

RUN npm run build-prod

CMD node server.js

EXPOSE 8088 443