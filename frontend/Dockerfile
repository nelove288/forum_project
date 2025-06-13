FROM node:18 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

# react-scripts에 실행 권한 부여
RUN chmod -R 755 ./node_modules

COPY ./ ./
RUN npm run build


# 2단계: Serve with nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# (Optional) Custom nginx config
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

