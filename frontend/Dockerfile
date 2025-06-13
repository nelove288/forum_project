FROM node:18 as build

WORKDIR /app

# package.json, package-lock.json 먼저 복사
COPY package*.json ./

# 모든 의존성 설치 (react-scripts 포함)
RUN npm install --legacy-peer-deps --unsafe-perm=true

# react-scripts 실행 가능하게 권한 부여 (추가 안전 조치)
RUN chmod -R +x ./node_modules/.bin

# 전체 프로젝트 복사
COPY . .

# 빌드 실행
RUN npm run build
