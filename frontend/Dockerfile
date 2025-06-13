FROM node:18 as build

WORKDIR /app

COPY package*.json ./

# devDependencies 포함 설치
RUN npm install

# 실행 권한 부여
RUN chmod -R +x node_modules/.bin

COPY ./ ./

RUN npm run build
