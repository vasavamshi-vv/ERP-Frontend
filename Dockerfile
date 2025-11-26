FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src ./src
COPY public ./public
COPY vite.config.js .
COPY index.html .

RUN npm run build


# ---------- NGINX ----------
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
