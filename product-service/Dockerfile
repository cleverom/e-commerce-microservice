FROM node:14-alpine

WORKDIR /app/src

COPY package*.json .


RUN yarn

COPY . .

RUN npx tsc

CMD ["yarn", "start"]
