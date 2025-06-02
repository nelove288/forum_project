# 1단계: React 앱 빌드
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2단계: nginx로 정적 파일 서빙
FROM nginx:alpine

# 빌드된 파일을 nginx 기본 경로로 복사
COPY --from=build /app/build /usr/share/nginx/html

# (선택 사항) 커스텀 nginx 설정 파일이 있다면 추가
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
