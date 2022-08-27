FROM node:18-alpine

RUN mkdir /fake-log
WORKDIR /fake-log

RUN apk add --no-cache git

COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
