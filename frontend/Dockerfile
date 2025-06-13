FROM node:18 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

# 권한 문제 해결용 권한 부여
RUN chmod +x node_modules/.bin/react-scripts

COPY ./ ./

RUN npm run build
