FROM node:14.4.0-stretch

WORKDIR /app

ADD ./package.json /app/package.json
ADD ./package-lock.json /app/package-lock.json

RUN npm install

ADD ./ /app/

RUN npm run build

ENV HOST 0.0.0.0

# start command
CMD [ "npm", "run", "start" ]