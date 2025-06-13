FROM node:18 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

# 권한 문제 해결용 권한 부여
RUN chmod -R 755 node_modules/.bin

COPY ./ ./

RUN npm run build
