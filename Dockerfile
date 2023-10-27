FROM node:20

WORKDIR /usr/src/app

COPY package.json yarn.lock tsconfig.json ./
COPY src ./src

RUN yarn

EXPOSE 8080

CMD [ "yarn", "start" ]
