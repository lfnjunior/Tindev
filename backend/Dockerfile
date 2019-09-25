FROM node:10-alpine

WORKDIR /usr/tindev-backend
COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]